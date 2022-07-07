package knutu.knutu.Controller.User;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;

import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.User.User;

public class UserController {

    @PatchMapping("/updateUser")
    public boolean updateUser(@RequestParam("id") User user) throws Exception {
        return FirebaseService.getFirebaseInstance().updateUser(user);
    }

    @DeleteMapping("/deleteUser")
    public boolean deleteUser(@RequestParam("id") String id) throws Exception {
        return FirebaseService.getFirebaseInstance().deleteUser(id);
    }
}
