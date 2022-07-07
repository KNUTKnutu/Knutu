package knutu.knutu.Service.lib.interfaces;

import java.io.IOException;

import knutu.knutu.Service.lib.classes.User.User;

import org.springframework.web.multipart.MultipartFile;

import com.google.firebase.auth.FirebaseAuthException;

public interface FirebaseServiceInterface {
    // PostContruct - Firebase Initializers
    public void initFirebaseApp(); // Initializer of Firebase Service
    public void initBucket();

    // Users
    public boolean addUser(String id, String pw, String name) throws Exception;
    public User getUser(String id) throws Exception;
    public boolean updateUser(String id, String pw, String name) throws Exception;
    public boolean deleteUser(String id) throws Exception;

    // Files
    public String addFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException; // By adding file, it outputs its downloadable path
    public String getFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException;
    public boolean updateFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException;
    public boolean deleteFile(String fileName) throws IOException, FirebaseAuthException;
}