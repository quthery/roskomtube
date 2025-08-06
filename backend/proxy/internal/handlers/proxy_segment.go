package handlers

import (
	"errors"
	"io"
	"log/slog"
	"net/http"
	"proxy/pkg/lib"
	"syscall"
	"time"
)

func ProxySegment(w http.ResponseWriter, r *http.Request) {
	parsedURL := r.URL.Query().Get("url")
	if parsedURL == "" {
		http.Error(w, "Missing URL parameter", http.StatusBadRequest)
		slog.Error("Missing URL parameter")
		return
	}

	transport := &http.Transport{
		DisableKeepAlives: false,
		MaxIdleConns:      10,
		IdleConnTimeout:   30 * time.Second,
	}
	client := &http.Client{
		Timeout:   15 * time.Second,
		Transport: transport,
	}

	req, err := http.NewRequest("GET", parsedURL, nil)
	if err != nil {
		http.Error(w, "Error creating request: "+err.Error(), http.StatusInternalServerError)
		slog.Error("Error creating request", "error", err)
		return
	}
	req.Header.Set("Connection", "keep-alive")
	lib.CopyHeaders(req.Header, r.Header)

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Error fetching segment: "+err.Error(), http.StatusInternalServerError)
		slog.Error("Error fetching segment", "error", err)
		return
	}
	defer resp.Body.Close()

	lib.CopyHeaders(w.Header(), resp.Header)
	w.Header().Set("Connection", "keep-alive")
	w.WriteHeader(resp.StatusCode)

	// Можно использовать буфер для io.Copy, например 64Кб
	buf := make([]byte, 64*1024)
	_, err = io.CopyBuffer(w, resp.Body, buf)
	if err != nil {
		if errors.Is(err, syscall.EPIPE) || errors.Is(err, io.ErrUnexpectedEOF) {
			slog.Warn("Client disconnected during segment streaming", "error", err)
			return
		}
		http.Error(w, "Error streaming segment: "+err.Error(), http.StatusInternalServerError)
		slog.Error("Error streaming segment", "error", err)
	}
}
