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
    public boolean updateUser(String id, User user) throws Exception {
        Firestore fs = FirestoreClient.getFirestore();

        // 1. 현재 저장되어있는 User 정보를 가져온다.
        User currentUser = this.getUser(id);

        // 2. 매개변수로 받은 id로 DB에 저장된 User 정보가 없으면 false를 return한다.
        if(currentUser == null) return false;

        // 3. currentUser 와 user를 비교하여, 다른 속성 값(프로퍼티)이 있으면 엎어쳐준다.

        // 4. Firebase에 업데이트한다.
        // ApiFuture<WriteResult> writeResult = fs.collection(COLLECTION__USER).document(id).update(currentUser);

        // 5. 업데이트가 성공하면 true를 리턴, 실패했다면 false를 리턴한다.
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
        Firestore fs = FirestoreClient.getFirestore();

        DocumentReference docRefer = fs.collection(COLLECTION__USER).document(id);
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
        
        Bucket firebaseBucket = StorageClient.getInstance().bucket(bucket);

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
