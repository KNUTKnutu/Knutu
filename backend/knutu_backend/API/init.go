package api

import (
	"github.com/gin-gonic/gin"

	instants "knutu_backend_go/instant"

	delete "knutu_backend_go/api/delete"
	get "knutu_backend_go/api/get"
	patch "knutu_backend_go/api/patch"
	post "knutu_backend_go/api/post"
	put "knutu_backend_go/api/put"
)

func InitAPIServer(_router *gin.Engine) {
	is_ready__GET := make(chan error)
	is_ready__POST := make(chan error)
	is_ready__PATCH := make(chan error)
	is_ready__PUT := make(chan error)
	is_ready__DELETE := make(chan error)

	go get.Init(is_ready__GET, _router)
	go post.Init(is_ready__POST, _router)
	go patch.Init(is_ready__PATCH, _router)
	go put.Init(is_ready__PUT, _router)
	go delete.Init(is_ready__DELETE, _router)

	if is_ready__GET != nil && is_ready__POST != nil && is_ready__PATCH != nil && is_ready__PUT != nil && is_ready__DELETE != nil {
		_router.Run(instants.GIN_CONFIG__PORT)
	} else {
		panic("Failed to open REST API")
	}
}
