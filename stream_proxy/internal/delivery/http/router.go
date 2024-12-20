package http


import (
	v1_handlers "UFetch/internal/delivery/http/v1"
	"github.com/gin-gonic/gin"
)

func InitAPI() *gin.Engine {
	r := gin.Default()
	v1 := r.Group("/v1")
	{
		v1.GET("/youtube", v1_handlers.ProxyYouTubeStream)
	}
	return r
}
