package websocket

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

func OpenWebSocket(_router *gin.Engine) {
	_router.GET("/ws", func(c *gin.Context) {

		upgrader := websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}

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
