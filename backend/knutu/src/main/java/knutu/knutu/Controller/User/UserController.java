package knutu.knutu.Controller.User;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.User.User;

@RestController
public class UserController {

    @PatchMapping("/updateUser")
    public boolean updateUser(@RequestParam("id") String id, @RequestBody User user) throws Exception {
        return FirebaseService.getFirebaseInstance().updateUser(id, user);
    }

    @DeleteMapping("/deleteUser")
    public boolean deleteUser(@RequestParam("id") String id) throws Exception {
        return FirebaseService.getFirebaseInstance().deleteUser(id);
    }
}
