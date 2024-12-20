package v1

import (
	"io"
	"log"
	"net/http"
)

func ProxyYouTubeStream(w http.ResponseWriter, r *http.Request) {
	parsedURL := r.URL.Query().Get("youtube_url")

	client := &http.Client{}
	req, err := http.NewRequest("GET", parsedURL, nil)
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
		http.Error(w, "Error fetching YouTube stream", http.StatusBadGateway)
		log.Printf("Error fetching YouTube stream: %v", err)
		return
	}
	defer resp.Body.Close()

	for key, values := range resp.Header {
		for _, value := range values {
			w.Header().Add(key, value)
		}
	}
	w.WriteHeader(resp.StatusCode)

	if _, err := io.Copy(w, resp.Body); err != nil {
		log.Printf("Error streaming response body: %v", err)
		http.Error(w, "Error streaming response body", http.StatusInternalServerError)
		return
	}
}
