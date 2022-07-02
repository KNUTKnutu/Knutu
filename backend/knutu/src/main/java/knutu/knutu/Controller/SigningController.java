package knutu.knutu.Controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.firebase.auth.FirebaseAuthException;

import knutu.knutu.Service.FirebaseService;

import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class SigningController {

    @GetMapping("/Hi")
    public String hello(@RequestParam(value = "name", defaultValue = "leejong") String name) {
        String response = String.format("Hello %s", name);
        return response;
    }

    @PostMapping("/uploadFile")
    public String testing(@RequestParam("file") MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        if(file.isEmpty()) return "error - file is empty";

        return new FirebaseService().uploadFile(file, fileName);
    }
}