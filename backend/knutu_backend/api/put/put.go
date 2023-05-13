package put

import "github.com/gin-gonic/gin"

func Init(c chan<- error, r *gin.Engine) {
	r.Group("/put")
	{

	}

	c <- nil
}
