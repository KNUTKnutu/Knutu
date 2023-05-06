package main

import (
  "github.com/gin-gonic/gin"
)

const GIN_CONFIG__PORT string = ":19410"

func main() {
  r := gin.Default()

  r.Run(GIN_CONFIG__PORT)
}