package knutu.knutu.Controller.User;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.firestore.DocumentSnapshot;

import knutu.knutu.Controller.Exceptions.Unauthorized;
import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.User.User;

@RestController
public class UserController {

    @PatchMapping("/updateUser")
    public boolean updateUser(@RequestParam("id") String id, @RequestParam("kind") String kind, @RequestBody User user) throws Exception {
        return FirebaseService.accessFirebaseInstance().updateUser(id, user, kind);
    }

    @DeleteMapping("/deleteUser")
    public boolean deleteUser(@RequestParam("id") String id) throws Exception {
        return FirebaseService.accessFirebaseInstance().deleteUser(id);
    }

    @GetMapping("/findId")
    public String findId(@RequestParam("email") String email) throws Exception {
        DocumentSnapshot user = FirebaseService.accessFirebaseInstance().getUserByEmail(email);
        if(user != null) {
            return user.getId();
        }
        throw new Unauthorized("No User Found");
    }

    @GetMapping("/findPw")
    public boolean findPw(@RequestParam("id") String id, @RequestParam("email") String email) throws Exception {
        FirebaseService instance = FirebaseService.accessFirebaseInstance();
        if(instance.getUserByEmail(email) != null && instance.getUser(id) != null)
            return true;

        throw new Unauthorized("No User Found");
    }

    @PatchMapping("/changePw")
    public boolean changePw(@RequestParam("id") String id, @RequestParam("pw") String pw) throws Exception {
        FirebaseService instance = FirebaseService.accessFirebaseInstance();
        User user = instance.getUser(id);
        if(user.getId() != "" || user.getId() == null)
        {
            try {
                user.setPw(pw);
                instance.updateUser(user.getId(), user, "pw");
                return true;
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return false;
    }
}
