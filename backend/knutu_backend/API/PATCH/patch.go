package patch

import "github.com/gin-gonic/gin"

func Init(c chan<- error, r *gin.Engine) {
	r.Group("/patch")
	{

	}

	c <- nil
}
