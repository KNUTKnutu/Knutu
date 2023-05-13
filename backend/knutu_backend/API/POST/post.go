package post

import "github.com/gin-gonic/gin"

func Init(c chan<- error, r *gin.Engine) {
	r.Group("/post")
	{

	}

	c <- nil
}
