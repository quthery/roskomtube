package main

import (
	"UFetch/internal/delivery/http"
	"fmt"
	h "net/http"
)

func main() {
	fmt.Println("Hello World")
	router := http.InitAPI()

	if err := h.ListenAndServe(":8080", router); err != nil {
		panic(err)
	}
}
