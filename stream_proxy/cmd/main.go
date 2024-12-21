package main

import (
	"fmt"
	h "net/http"
	router "roskomtube/internal/delivery/http"
)

func main() {
	port := ":8080"
	fmt.Printf("Started at %s", port)
	router := router.InitAPI()

	if err := h.ListenAndServe(port, router); err != nil {
		panic(err)
	}
}
