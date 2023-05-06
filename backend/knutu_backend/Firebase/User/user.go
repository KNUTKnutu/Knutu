package Firebase

import (
	"fmt"
	"knutu_backend_go/Firebase"
	"knutu_backend_go/Struct"

	"google.golang.org/api/iterator"
)

func GetUserByName(_userName string) (Struct.User, error) {
	ctx := Firebase.GetContext()
	client := Firebase.GetFirestore()

	iter := client.Collection("User").Where("name", "==", _userName).Documents(ctx)

	defer iter.Stop()

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			return Struct.User{}, fmt.Errorf("user not found")
		}
		if err != nil {
			return Struct.User{}, err
		}

		var user Struct.User
		err = doc.DataTo(&user)
		if err != nil {
			return Struct.User{}, err
		}

		return user, nil
	}
}
