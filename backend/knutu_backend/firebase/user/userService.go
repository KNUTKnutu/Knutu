package Firebase

import (
	"fmt"
	Firebase "knutu_backend_go/firebase"

	"knutu_backend_go/structs"

	"google.golang.org/api/iterator"
)

func GetUserByName(_userName string) (structs.User, error) {
	ctx := Firebase.GetContext()
	client := Firebase.GetFirestore()

	iter := client.Collection("User").Where("name", "==", _userName).Documents(ctx)

	defer iter.Stop()

	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			return structs.User{}, fmt.Errorf("user not found")
		}
		if err != nil {
			return structs.User{}, err
		}

		var user structs.User
		err = doc.DataTo(&user)
		if err != nil {
			return structs.User{}, err
		}

		return user, nil
	}
}
