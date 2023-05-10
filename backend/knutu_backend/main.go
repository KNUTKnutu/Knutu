package main

import (
	api "knutu_backend_go/API"
	middleware "knutu_backend_go/API/Middleware"
	Firebase "knutu_backend_go/Firebase"
	instants "knutu_backend_go/InstantsLib"
	websocket "knutu_backend_go/Websocket"

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

	r.Run(instants.GIN_CONFIG__PORT)
}

func afterDeath() {
	Firebase.GetFirestore().Close()
}
