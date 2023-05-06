package main

import (
  "context"
  "os"

  "firebase.google.com/go"
  "google.golang.org/api/option"
)

const PATH__FIREBASE_CONFIG string = "/Privates/serviceAccountKey.json"

func InitFirebase() (*firebase.App, error) {
  firebaseConfigPath := os.Getenv(PATH__FIREBASE_CONFIG)
  
  opt := option.WithCredentialsFile(firebaseConfigPath)
  app, err := firebase.NewApp(context.Background(), nil, opt)
  if err != nil {
    return nil, err
  }

  return app, nil
}