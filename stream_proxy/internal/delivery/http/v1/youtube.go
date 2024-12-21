package v1

import (
	"errors"
	"io"
	"log"
	"net/http"
	"syscall"
	"time"
)

func ProxyStream(w http.ResponseWriter, r *http.Request) {
	parsedURL := r.URL.Query().Get("url")
	if parsedURL == "" {
		http.Error(w, "Missing URL parameter", http.StatusBadRequest)
		return
	}

	transport := &http.Transport{
		DisableKeepAlives: false,
	}
	client := &http.Client{
		Transport: transport,
		Timeout:   30 * time.Second,
	}

	req, err := http.NewRequestWithContext(r.Context(), "GET", parsedURL, nil)
	if err != nil {
		http.Error(w, "Error creating request", http.StatusInternalServerError)
		log.Printf("Error creating request: %v", err)
		return
	}

	for key, values := range r.Header {
		for _, value := range values {
			req.Header.Add(key, value)
		}
	}
	resp, err := client.Do(req)

	if err != nil {
		http.Error(w, "Error fetching stream", http.StatusBadGateway)
		log.Printf("Error fetching stream: %v", err)
		return
	}
	defer resp.Body.Close()

	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}

	w.WriteHeader(resp.StatusCode)

	buffer := make([]byte, 32*1024)
	if _, err := io.CopyBuffer(w, resp.Body, buffer); err != nil {
		if errors.Is(err, syscall.EPIPE) || errors.Is(err, io.ErrUnexpectedEOF) {
			log.Printf("Client closed connection: %v", err)
			return
		}
		log.Printf("Error streaming response body: %v", err)
		return
	}
}
