package knutu.knutu.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.firebase.auth.FirebaseAuthException;

import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.User.User;

import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class SigningController {

    /* <!-- Test Codes */
    @GetMapping("/Hi")
    public String hello(@RequestParam(value = "name", defaultValue = "leejong") String name) {
        String response = String.format("Hello %s", name);
        return response;
    }

    @PostMapping("/uploadFile")
    public String testing(@RequestParam("file") MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        if(file.isEmpty()) return "error - file is empty";

        return FirebaseService.getFirebaseInstance().addFile(file, fileName);
    }
    /* Test Codes --> */

    @PostMapping("/signup")
    public String signUp(@RequestParam("id") String id, @RequestParam("pw") String pw, @RequestParam("name") String name) {
        try {
            FirebaseService firebaseInstance = FirebaseService.getFirebaseInstance();
            if(firebaseInstance.checkDuplicatedId(id)) return "duplicated id";
            firebaseInstance.addUser(id, pw, name);
            return "user added";
        } catch(InvocationTargetException e) {
            e.getTargetException();
            return "error while signing up";
        } catch (Exception e) {
            e.printStackTrace();
            return "error while signing up";
        }
    }

    @GetMapping("/signin")
    public User signIn(@RequestParam("id") String id, @RequestParam("pw") String pw) {
        User user = null;

        try {
            user = FirebaseService.getFirebaseInstance().getUser(id);
        } catch(InvocationTargetException e) {
            e.getTargetException();
        } catch (Exception e) {
            e.printStackTrace();
        }

        if(user == null || user.getPw() != pw) return null;

        return user;
    }

    @GetMapping("/deleteUser")
    public boolean deleteUser(@RequestParam("id") String id) throws Exception {
        return FirebaseService.getFirebaseInstance().deleteUser(id);
    }
}