package main

import (
 "fmt"
 "log"
 "net/http"
 "os"
)

func enableCORS(next http.Handler) http.Handler {
 return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
  // Разрешаем все заголовки CORS
  w.Header().Set("Access-Control-Allow-Origin", "*")
  w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  w.Header().Set("Access-Control-Allow-Headers", "*")
  w.Header().Set("Access-Control-Expose-Headers", "*")

  if r.Method == "OPTIONS" {
   w.WriteHeader(http.StatusOK)
   return
  }

  next.ServeHTTP(w, r)
 })
}

func main() {
 // Directory containing the HLS files
 hlsDir := "./streams"

 // Check if HLS directory exists
 if _, err := os.Stat(hlsDir); os.IsNotExist(err) {
  // Создаем директорию если не существует
  if err := os.MkdirAll(hlsDir, 0755); err != nil {
   log.Fatalf("Failed to create HLS directory: %v", err)
  }
 }

 // Serve the HLS files with CORS
 fs := http.FileServer(http.Dir(hlsDir))
 http.Handle("/streams/", enableCORS(http.StripPrefix("/streams/", fs)))

 // Start the HTTP server
 port := 3000
 fmt.Printf("Starting HLS server on http://localhost:%d\n", port)
 log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}