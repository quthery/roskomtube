package http

import (
	v1_handlers "roskomtube/internal/delivery/http/v1"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func InitAPI() *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.Recoverer)
	r.Use(middleware.Logger)

	r.Route("/v1", func(v1 chi.Router) {
		r.Get("/stream", v1_handlers.ProxyStream)
	})

	return r
}
