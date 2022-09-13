package knutu.knutu.Controller.User;

import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Controller.Exceptions.Unauthorized;
import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.User.User;

import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class SigningController {

    @GetMapping("/signin")
    public User signIn(@RequestParam("id") String id, @RequestParam("pw") String pw) throws Exception {
        User user = FirebaseService.getFirebaseInstance().getUserForLogin(id, pw);
        if(user == null) {
            throw new Unauthorized("Wrong user information given.");
        }
        return user;
    }

    @PostMapping("/signup")
    public boolean signUp(@RequestParam("id") String id, @RequestParam("pw") String pw, @RequestParam("name") String name) throws Exception {
        return FirebaseService.getFirebaseInstance().addUser(id, pw, name);
    }
}