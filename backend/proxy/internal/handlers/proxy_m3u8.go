package handlers

import (
	"io"
	"net/http"
	"net/url"
	"proxy/pkg/lib"
	"strings"
)

func ProxyM3U8(w http.ResponseWriter, r *http.Request) {
	parsedURL := r.URL.Query().Get("url")
	if parsedURL == "" {
		http.Error(w, "Missing URL parameter", http.StatusBadRequest)
		return
	}

	client := &http.Client{}
	req, err := http.NewRequest("GET", parsedURL, nil)
	if err != nil {
		http.Error(w, "Error creating request: "+err.Error(), http.StatusInternalServerError)
		return
	}

	lib.CopyHeaders(req.Header, r.Header)

	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Error fetching m3u8: "+err.Error(), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "application/vnd.apple.mpegurl")
	w.WriteHeader(resp.StatusCode)

	// Переписываем ссылки внутри m3u8
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Error reading m3u8: "+err.Error(), http.StatusInternalServerError)
		return
	}

	rewritten := rewriteM3U8Links(string(body), parsedURL)
	w.Write([]byte(rewritten))
}

// Функция переписывает ссылки на сегменты через ваш прокси
func rewriteM3U8Links(m3u8Content, baseURL string) string {
	lines := strings.Split(m3u8Content, "\n")
	base, _ := url.Parse(baseURL)
	for i, line := range lines {
		if strings.HasPrefix(line, "#") || strings.TrimSpace(line) == "" {
			continue
		}
		segmentURL, err := url.Parse(line)
		if err != nil {
			continue
		}
		if !segmentURL.IsAbs() {
			segmentURL = base.ResolveReference(segmentURL)
		}
		// Меняем ссылку на сегмент на ваш эндпоинт
		lines[i] = "http://localhost:8000/proxy/segment?url=" + url.QueryEscape(segmentURL.String())
	}
	return strings.Join(lines, "\n")
}
