package http

import (
	v1_handlers "UFetch/internal/delivery/http/v1"

	"github.com/go-chi/chi/v5"
)

func InitAPI() *chi.Mux {
	r := chi.NewRouter()
	v1 := chi.NewRouter()

	r.Mount("/v1", v1)

	v1.Get("/youtube", v1_handlers.ProxyYouTubeStream)

	return r
}
