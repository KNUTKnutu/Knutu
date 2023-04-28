package knutu.knutu.Controller.File;

import java.io.IOException;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.google.firebase.auth.FirebaseAuthException;

import knutu.knutu.Service.FirebaseService;

public class FileController {

    @PostMapping("/uploadFile")
    public String testing(@RequestParam("file") MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        if(file.isEmpty()) return "error - file is empty";

        return FirebaseService.accessFirebaseInstance().addFile(file, fileName);
    }
}
