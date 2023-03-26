package main

import (
	"fmt"
	"net/http"
)

func main() {
	fmt.Println("Hello GO")

	http.ListenAndServe(":3000", http.HandlerFunc(handleRequest))
}

func handleRequest(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello !"))
}
