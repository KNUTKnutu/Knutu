package get

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func Init(c chan<- error, r *gin.Engine) {
	r.Group("/get")
	{
		r.GET("/serverAlive", serverAlive) // /serverAlive
	}

	c <- nil
}

func serverAlive(c *gin.Context) {
	time.Sleep(1 * time.Second)
	c.JSON(http.StatusOK, true)
}
