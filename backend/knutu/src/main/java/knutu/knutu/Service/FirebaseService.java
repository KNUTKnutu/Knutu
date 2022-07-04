package knutu.knutu.Service;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;

import knutu.knutu.Service.lib.classes.User;
import lombok.extern.slf4j.Slf4j;

interface firebaseService {
    // PostContruct - Firebase Initializers
    public void initFirebaseApp(); // Initializer of Firebase Service
    public void initBucket();

    // Users
    public void addUser(String id, String pw, String name) throws Exception;
    public User getUser(String id) throws Exception;
    public void updateUser(String id, String pw, String name) throws Exception;
    public void deleteUser(String id) throws Exception;

    // Files
    public String addFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException; // By adding file, it outputs its downloadable path
    public String getFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException;
    public void updateFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException;
    public void deleteFile(String fileName) throws IOException, FirebaseAuthException;
}

@Slf4j
@Service
public class FirebaseService implements firebaseService {
    
    @Value("${app.firebase-bucket}")
    private String bucket;
    private Bucket firebaseBucket; // storage
    private Firestore db;

    private final String COLLECTION__USER = "user";
    private final String COLLECTION__FILE = "file";

    public static final FirebaseService firebaseInstance = new FirebaseService();
    public static FirebaseService getFirebaseInstance() { return firebaseInstance; }
    
    @PostConstruct // stands for the genesis of lifecycle in Java Bean
    public void initFirebaseApp() {
        try {
            FileInputStream serviceAccount;
            FirebaseOptions options;

            final String keyURL = "src/main/resources/serviceAccountKey.json";
            final String dbURL = "https://knutu-3e04f-default-rtdb.asia-southeast1.firebasedatabase.app";
            
            serviceAccount = new FileInputStream(keyURL);
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(dbURL)
                    .build();

            FirebaseApp.initializeApp(options);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void initBucket() {
        try {
            this.firebaseBucket = StorageClient.getInstance().bucket(bucket);
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    @PostConstruct
    public void initDB() {
        try {
            this.db = FirestoreClient.getFirestore();
        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    /* <!-- User */
    // Create
    public void addUser(String id, String pw, String name) throws Exception {

        if(this.checkDuplicatedId(id)) return;

        User user = new User();

        user.setPw(pw);
        user.setName(name);

        ApiFuture<WriteResult> apiFuture = db.collection(COLLECTION__USER).document(id).set(user);
        log.info(apiFuture.get().getUpdateTime().toString());
    }

    // Read
    public User getUser(String id) throws Exception {
        DocumentSnapshot userSnapshot = getUserSnapshot(id);

        if(!userSnapshot.exists()) return null;

        return userSnapshot.toObject(User.class);
    }

    // Update
    public void updateUser(String id, String pw, String name) throws Exception {
    }

    // Delete
    public void deleteUser(String id) throws Exception {
        db.collection(COLLECTION__USER).document(id).delete();
    }

    // Etcs
    private DocumentSnapshot getUserSnapshot(String id) throws Exception {
        DocumentReference docRefer = db.collection(COLLECTION__USER).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = docRefer.get();
        DocumentSnapshot docSnapshot = apiFuture.get();

        return docSnapshot;
    }

    public boolean checkDuplicatedId(String id) throws Exception {
        return this.getUserSnapshot(id).exists();
    }
    /* User --> */

    /* <!-- File */
    // Create
    public String addFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        InputStream content;
        Blob blob;

        content = new ByteArrayInputStream(file.getBytes());
        blob = firebaseBucket.create(fileName.toString(), content, file.getContentType());

        return blob.getMediaLink();
    }

    // Read
    public String getFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        return "";
    }

    // Update
    public void updateFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
    }

    // Delete
    public void deleteFile(String fileName) throws IOException, FirebaseAuthException {
    }
    /* File --> */
}
