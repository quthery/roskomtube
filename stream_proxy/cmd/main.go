package main

import (
  router "UFetch/internal/delivery/http"
	"fmt"
	h "net/http"
)

func main() {
  port := ":8080"
  fmt.Printf("Started at %s", port)
	router := router.InitAPI()
  
  if err := h.ListenAndServe(port , router); err != nil {
		panic(err)
	}
}
