package main

import (
	"log"
	"net/http"
	"proxy/internal/handlers"
	"time"

	"github.com/gorilla/mux"
)

func main() {
    r := mux.NewRouter()
	r.HandleFunc("/proxy", handlers.ProxyStream).Methods("GET")
	r.HandleFunc("/proxy/hls", handlers.ProxyM3U8).Methods("GET")
	r.HandleFunc("/proxy/segment", handlers.ProxySegment).Methods("GET")
    srv := &http.Server{
        Handler:      r,
        Addr:         "127.0.0.1:8000",
        WriteTimeout: 30 * time.Second,
        ReadTimeout:  30 * time.Second,
    }
	log.Fatal(srv.ListenAndServe())
}