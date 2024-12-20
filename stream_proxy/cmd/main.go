package main

import (
	"UFetch/internal/delivery/http"
	"fmt"
)

func main() {
	fmt.Println("Hello World")
	router := http.InitAPI()

	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
