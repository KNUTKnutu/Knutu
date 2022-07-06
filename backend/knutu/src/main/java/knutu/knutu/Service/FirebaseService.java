package knutu.knutu.Service;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Timestamp;
import java.util.List;

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
import com.google.gson.JsonObject;

import knutu.knutu.Service.lib.classes.User.Preference;
import knutu.knutu.Service.lib.classes.User.User;
import knutu.knutu.Service.lib.interfaces.FirebaseServiceInterface;
import knutu.knutu.Service.lib.privates.privates;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FirebaseService implements FirebaseServiceInterface {
    
    @Value("${app.firebase-bucket}")
    private String bucket;
    private Bucket firebaseBucket; // storage
    private Firestore db;
    private FirebaseApp firebaseApp;

    private final String COLLECTION__USER = "User";
    private final String COLLECTION__FILE = "File";

    public static final FirebaseService firebaseInstance = new FirebaseService();
    public static FirebaseService getFirebaseInstance() { return firebaseInstance; }
    
    @PostConstruct
    public void initFirebaseApp() {

        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();

        if(firebaseApps != null && firebaseApps.isEmpty() == false) {
            for(FirebaseApp app : firebaseApps) {
                if(app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    firebaseApp = app;
                }
            }
        }
        else {
            try {
                FileInputStream serviceAccount;
                FirebaseOptions options;
    
                String keyURL = privates.keyURL;
                String dbURL = privates.dbURL;
    
                serviceAccount = new FileInputStream(keyURL);
                options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setDatabaseUrl(dbURL)
                        .build();
    
                firebaseApp.initializeApp(options);
    
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    @PostConstruct
    public void initBucket() {
        if(this.firebaseBucket == null) {
            try {
                this.firebaseBucket = StorageClient.getInstance().bucket(bucket);
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
    }

    @PostConstruct
    public void initDB() {
        if(this.db == null) {
            try {
                this.db = FirestoreClient.getFirestore();
            } catch(Exception e) {
                e.printStackTrace();
            }
        }
    }

    /* <!-- User */
    // Create
    public boolean addUser(String id, String pw, String name) throws Exception {

        if(this.checkDuplicatedId(id)) return false;

        Firestore fs = FirestoreClient.getFirestore();
        
        User user = new User();
        Timestamp now = new Timestamp(System.currentTimeMillis());

        Preference pref = new Preference();
        pref.setLanguage(Preference.LANGUAGE__DEFAULT);

        user.setPw(pw);
        user.setName(name);
        user.setPreference(pref);
        user.setCreated_time(now);
        user.setUpdated_time(now);

        ApiFuture<WriteResult> apiFuture = 
            fs
            .collection(COLLECTION__USER)
            .document(id)
            .set(user);

        log.info(apiFuture.get().getUpdateTime().toString());

        return true;
    }

    // Read
    public User getUser(String id) throws Exception {
        try {
            DocumentSnapshot userSnapshot = getUserSnapshot(id);
    
            if(!userSnapshot.exists()) return null;
    
            return userSnapshot.toObject(User.class);
        } catch (NullPointerException e) {
            return null;
        }
    }

    // Update
    public boolean updateUser(String id, String pw, String name) throws Exception {
        return true;
    }

    // Delete
    public boolean deleteUser(String id) throws Exception {
        Firestore fs = FirestoreClient.getFirestore();

        ApiFuture<WriteResult> writeResult = fs.collection(COLLECTION__USER).document(id).delete();
        return writeResult.isDone();
    }

    // Etcs
    private DocumentSnapshot getUserSnapshot(String id) throws Exception {
        DocumentReference docRefer = db.collection(COLLECTION__USER).document(id);
        ApiFuture<DocumentSnapshot> apiFuture = docRefer.get();
        DocumentSnapshot docSnapshot = apiFuture.get();

        return docSnapshot;
    }

    public boolean checkDuplicatedId(String id) throws Exception {
        try {
            return this.getUserSnapshot(id).exists();
        } catch (NullPointerException e) {
            return false;
        }
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
    public boolean updateFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        return true;
    }

    // Delete
    public boolean deleteFile(String fileName) throws IOException, FirebaseAuthException {
        return true;
    }
    /* File --> */

    /* <!-- Private Functions */
    /* Private Functions -->*/
}
