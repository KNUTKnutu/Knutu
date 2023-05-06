package main

import (
	"fmt"
	"knutu_backend_go/Firebase"
	"net/http"

	firebase "firebase.google.com/go"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

const GIN_CONFIG__PORT string = ":19410"
const GIN_CONFIG__CONTEXT_KEY__FIREBASE string = "firebase"

func main() {

	defer afterDeath()

	firebaseApp := initFirebase()
	runBackend(firebaseApp)
}

func initFirebase() *firebase.App {
	firebaseApp, err := Firebase.InitFirebase()

	if err != nil {
		panic(err)
	}

	return firebaseApp
}

func runBackend(_firebaseApp *firebase.App) {
	r := gin.New()

	setMiddlewaresOnGinRouter(r, _firebaseApp)
	openWebSocket(r)

	r.Run(GIN_CONFIG__PORT)
}

func setMiddlewaresOnGinRouter(_router *gin.Engine, _firebaseApp *firebase.App) {
	_router.Use(func(c *gin.Context) {
		// 만약 Mac OS에서 프록시 설정에 문제가 생긴다면, Mac에서 사용할 Trust proxy 값 설정을 바꿔줘야함.
		// Windows에서 사용하는 Localhost와 Mac OS에서 사용하는 Localhost 주소가 다르기 때문.
		c.Set("trust_proxy", "127.0.0.1")
	})
	_router.Use(gin.Recovery())
	_router.Use(gin.Logger())

	_router.Use(func(c *gin.Context) {
		c.Set(GIN_CONFIG__CONTEXT_KEY__FIREBASE, _firebaseApp)
		c.Next()
	})
}

func openWebSocket(_router *gin.Engine) {
	_router.GET("/ws", func(c *gin.Context) {
		conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
		if err != nil {
			fmt.Println(err)
			return
		}
		defer conn.Close()

		for {
			// Request
			_, msg, err := conn.ReadMessage()
			if err != nil {
				fmt.Println(err)
				return
			}
			fmt.Printf("Message Received: %s\n", msg)

			// Response
			if err := conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				fmt.Println(err)
				return
			}
		}
	})
}

func afterDeath() {
	// close firestore client
	Firebase.GetFirestore().Close()
}
