package Firebase

import (
	"context"
	"fmt"
	"os"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"google.golang.org/api/option"
)

// const PATH__FIREBASE_CONFIG string = "./Privates/serviceAccountKey.json"

var (
	ctx             context.Context   = nil
	app             *firebase.App     = nil
	firestoreClient *firestore.Client = nil
)

func InitFirebase() (*firebase.App, error) {

	const ENV_FIREBASE__CONFIG_JSON string = "SERVICE_ACCOUNT_KEY"
	const ENV_FIREBASE__PROJECT_ID string = "KNUTU_BACKEND_PROJECT_ID"

	var err error = nil

	// Set the context under the hood
	ctx = context.Background()

	// Initialize with Config
	firebaseConfigPath := os.Getenv(ENV_FIREBASE__CONFIG_JSON)
	firebaseProjectID := os.Getenv(ENV_FIREBASE__PROJECT_ID)

	fmt.Println(firebaseConfigPath)

	// Initialize Firebase Itself
	opt := option.WithCredentialsFile(firebaseConfigPath)
	app, err = firebase.NewApp(ctx, &firebase.Config{
		ProjectID: firebaseProjectID,
	}, opt)

	if err != nil {
		return nil, err
	}

	// Initialize Firestore
	firestoreClient, err = app.Firestore(ctx)
	if err != nil {
		panic(fmt.Errorf("error initializing firestore client: %v", err))
	}

	return app, nil
}

func GetContext() context.Context {
	return ctx
}

func GetFirebase() *firebase.App {
	return app
}

func GetFirestore() *firestore.Client {
	return firestoreClient
}
