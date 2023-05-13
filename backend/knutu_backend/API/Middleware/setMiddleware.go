package middleware

import (
	instants "knutu_backend_go/instant"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
)

func SetMiddlewaresOnGinRouter(_router *gin.Engine, _firebaseApp *firebase.App) {
	// _router.Use(func(c *gin.Context) {
	// 	// 만약 Mac OS에서 프록시 설정에 문제가 생긴다면, Mac에서 사용할 Trust proxy 값 설정을 바꿔줘야함.
	// 	// Windows에서 사용하는 Localhost와 Mac OS에서 사용하는 Localhost 주소가 다르기 때문.
	// 	// c.Set("trust_proxy", "127.0.0.1")
	// })
	_router.Use(gin.Recovery())
	_router.Use(gin.Logger())

	_router.Use(func(c *gin.Context) {
		c.Set(instants.GIN_CONFIG__CONTEXT_KEY__FIREBASE, _firebaseApp)
		c.Next()
	})

	SetCORS()
}
