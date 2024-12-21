package v1

import (
	"io"
	"log"
	"net/http"
	"roskomtube/pkg/http/client"
)

func ProxyStream(w http.ResponseWriter, r *http.Request) {
	parsedURL := r.URL.Query().Get("url")
	if parsedURL == "" {
		http.Error(w, "Missing URL parameter", http.StatusBadRequest)
		return
	}

	client := client.NewClient(true, parsedURL)

	resp, err := client.Get()
	if err != nil {
		http.Error(w, "Error fetching URL: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	copyHeaders(w, resp.Header)
	w.WriteHeader(resp.StatusCode)
	startStream(w, resp.Body)
}

func copyHeaders(w http.ResponseWriter, headers http.Header) {
	for key, values := range headers {
		w.Header()[key] = values
	}
}

func startStream(w io.Writer, r io.Reader) {
	_, err := io.Copy(w, r)
	if err != nil {
		log.Printf("Error streaming: %v", err)
	}
}
