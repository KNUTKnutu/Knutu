package main

import (
	api "knutu_backend_go/api"
	middleware "knutu_backend_go/api/middleware"
	Firebase "knutu_backend_go/firebase"
	websocket "knutu_backend_go/websocket"

	firebase "firebase.google.com/go"
	gin "github.com/gin-gonic/gin"
)

func main() {
	defer afterDeath()
	runBackend()
}

func initFirebase() *firebase.App {
	firebaseApp, err := Firebase.InitFirebase()

	if err != nil {
		panic(err)
	}

	return firebaseApp
}

func runBackend() {
	r := gin.New()
	_firebaseApp := initFirebase()

	middleware.SetMiddlewaresOnGinRouter(r, _firebaseApp)
	websocket.OpenWebSocket(r)
	api.InitAPIServer(r)
}

func afterDeath() {
	Firebase.GetFirestore().Close()
}
