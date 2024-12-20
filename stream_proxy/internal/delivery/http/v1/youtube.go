package v1

import (
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
)

func ProxyYouTubeStream(c *gin.Context) {
	parsedURL := c.Query("youtube_url")

	req, err := http.NewRequest("GET", parsedURL, nil)
	if err != nil {
		c.String(http.StatusInternalServerError, "Error creating request")
		log.Printf("Error creating request: %v", err)
		return
	}

	for key, values := range c.Request.Header {
		for _, value := range values {
			req.Header.Add(key, value)
		}
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.String(http.StatusBadGateway, "Error fetching YouTube stream")
		log.Printf("Error fetching YouTube stream: %v", err)
		return
	}
	defer resp.Body.Close()

	for key, values := range resp.Header {
		for _, value := range values {
			c.Writer.Header().Add(key, value)
		}
	}
	c.Writer.WriteHeader(resp.StatusCode)

	_, err = io.Copy(c.Writer, resp.Body)
	if err != nil {
		log.Printf("Error streaming response body: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"Error streaming response body: %v": err,
		})
		return
	}
}
