package knutu.knutu.Service;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Instant;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.core.ApiFuture;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.cloud.StorageClient;

import knutu.knutu.Service.lib.classes.User.Experience;
import knutu.knutu.Service.lib.classes.User.Preference;
import knutu.knutu.Service.lib.classes.User.User;
import knutu.knutu.Service.lib.interfaces.FirebaseServiceInterface;
import knutu.knutu.Service.lib.privates.privates;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class FirebaseService implements FirebaseServiceInterface {
    private FirebaseApp firebaseApp;

    private final String COLLECTION__USER = "User";
    // private final String COLLECTION__FILE = "File";

    // private final String KIND__USER = "user";
    // enum RequestKind {
    //     NAME("name"),
    //     PW("pw"),
    //     EMAIL("email"),
    //     EXP("experience"),
    //     PROFILE_PICTURE("profilePicture")
    // }

    private final String KIND__NAME = "name";
    private final String KIND__PW = "pw";
    private final String KIND__EMAIL = "email";
    private final String KIND__EXPERIENCE = "experience";
    private final String KIND__PROFILE_PICTURE = "profilePicture";

    private String bucket = privates.BUCKET_NAME;

    public static final FirebaseService firebaseInstance = new FirebaseService();
    public static FirebaseService accessFirebaseInstance() { return firebaseInstance; }
    
    @PostConstruct
    public void initFirebaseApp() {

        List<FirebaseApp> firebaseApps = FirebaseApp.getApps();

        if(firebaseApps != null && firebaseApps.isEmpty() == false) {
            for(FirebaseApp app : firebaseApps) {
                if(app.getName().equals(FirebaseApp.DEFAULT_APP_NAME)) {
                    this.firebaseApp = app;
                }
            }
        }
        else {
            try {
                FileInputStream serviceAccount;
                FirebaseOptions options;
    
                String keyURL = privates.KEY_URL;
                String dbURL = privates.DB_URL;
    
                serviceAccount = new FileInputStream(keyURL);
                options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setDatabaseUrl(dbURL)
                        .build();
    
                FirebaseApp.initializeApp(options);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /* <!-- User */
    // Create
    public boolean addUser(User _user) throws Exception {

        // 황여진 TODO: 아래 메소드 구현(Validation)
        String validationResult = this.validateUserForSignUp(_user);
        if(validationResult != "") {
            // throw new BadRequest(validationResult);
        }

        Firestore fs = FirestoreClient.getFirestore();
        
        User user = new User();
        long now = Instant.now().toEpochMilli();

        Preference pref = new Preference();
        pref.setLanguage(Preference.LANGUAGE__DEFAULT);
        pref.setAccountDisabled(false);
        pref.setMasterVolume(40);

        user.setId(_user.getId());
        user.setPw(_user.getPw());
        user.setName(_user.getName());
        user.setEmail(_user.getEmail());
        user.setTitle("끄누투를 처음 접한");
        user.setProfilePicture("");
        user.setPreference(pref);
        user.setLevel(1);
        user.setCurrentExperience(0);
        user.setTotalExperience(Experience.getTotalExperience(1));
        user.setRemainExperience(Experience.getRemainExperience(0, 1));
        user.setCreated_time(now);
        user.setUpdated_time(now);
        user.setReportedCount(0);
        user.setAccountGaemaeneo(false);
        user.setAccountSuspended(false);
        user.setInGame(false);

        // ApiFuture<WriteResult> apiFuture = 
            fs
            .collection(COLLECTION__USER)
            .document(_user.getId())
            .set(user);

        return true;
    }

    private String validateUserForSignUp(User _user) throws Exception {
        if(this.checkDuplicatedId(_user.getId())) return "Duplicated User";
        return "";
    }

    // Read
    public User getUser(String id) throws Exception {
        try {
            DocumentSnapshot userSnapshot = getUserSnapshot(id);
            if(!userSnapshot.exists()) return null;

            User user = userSnapshot.toObject(User.class);
    
            return user;
        } catch (NullPointerException e) {
            return null;
        }
    }

    public User findId(String email) throws Exception {
        try {
            DocumentSnapshot userSnapshot = getUserByEmail(email);
            if(!userSnapshot.exists()) return null;

            User user = userSnapshot.toObject(User.class);
    
            return user;
        } catch (NullPointerException e) {
            return null;
        }
    }

    public User getUserWithName(String name) throws Exception {
        try {
            DocumentSnapshot userSnapshot = this.getUserByName(name);
    
            if(!userSnapshot.exists()) return null;
    
            return userSnapshot.toObject(User.class);
        } catch (NullPointerException e) {
            return null;
        }
    }

    public User getUserForLogin(String id, String pw) throws Exception {
        try {
            User user = this.getUser(id);
            if(!user.getPw().contains(pw) || user.getPw().length() != pw.length()) return null;
            return user;
        } catch (NullPointerException e) {
            return null;
        }
    }

    public ResponseEntity<Resource> getProfilePicture(String _userId) throws Exception {
        StorageClient storageInstance = StorageClient.getInstance();
        Bucket bucketInstance = storageInstance.bucket(this.bucket);

        User currentUser = this.getUser(_userId);
        String profilePictureAddr = currentUser.getProfilePicture();

        Blob blob = bucketInstance.get(profilePictureAddr);
        if(blob == null) {
            throw new Exception("Profile Picture not Found");
        }

        byte[] fileBytes = StreamUtils.copyToByteArray(new ByteArrayInputStream(blob.getContent()));
        ByteArrayResource resource = new ByteArrayResource(fileBytes);
    
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDispositionFormData("attachment", profilePictureAddr);
        headers.setContentType(MediaType.IMAGE_PNG); // 이미지 타입에 맞게 변경
    
        return ResponseEntity.ok()
            .headers(headers)
            .body(resource);
    }

    // Update
    public boolean updateUser(String id, User user, String kind) throws Exception {
        try {
            Firestore fs = FirestoreClient.getFirestore();
    
            User currentUser = this.getUser(id);
    
            switch(kind) {
                case KIND__EXPERIENCE:
                    currentUser.setTotalExperience(user.getTotalExperience());
                    currentUser.setCurrentExperience(user.getCurrentExperience());
                    currentUser.setRemainExperience(user.getRemainExperience());
                    break;
                case KIND__NAME:
                    currentUser.setName(user.getName());
                    break;
                case KIND__EMAIL:
                    currentUser.setEmail(user.getEmail());
                    break;
                case KIND__PW:
                    currentUser.setPw(user.getPw());
                    break;
                case KIND__PROFILE_PICTURE:
                    currentUser.setProfilePicture(user.getProfilePicture());
                    break;
            }
    
            long now = Instant.now().toEpochMilli();
    
            currentUser.setUpdated_time(now);
    
            ApiFuture<WriteResult> apiFuture = 
                fs
                .collection(COLLECTION__USER)
                .document(currentUser.getId())
                .set(currentUser);
    
            log.info(apiFuture.get().getUpdateTime().toString());
    
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean changeProfilePicture(MultipartFile _file, String _userId) throws Exception {
        StorageClient storage = StorageClient.getInstance();
        Bucket bucket = storage.bucket(this.bucket);

        String fileName = _file.getOriginalFilename();
        String filePath = "profilePicture/" + _userId + "/profilePicture";

        File file = File.createTempFile(_userId, fileName);
        _file.transferTo(file);

        Blob blobRequestResult = bucket.create(filePath, new FileInputStream(file), _file.getContentType());
        if(blobRequestResult.equals(null)) {
            return false;
        }

        User currentUser = this.getUser(_userId);
        currentUser.setProfilePicture(filePath);

        this.updateUser(_userId, currentUser, KIND__PROFILE_PICTURE);

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

    public DocumentSnapshot getUserByName(String name) throws Exception {
        return this.getUser(this.KIND__NAME, name);
    }

    public DocumentSnapshot getUserByEmail(String email) throws Exception {
        return this.getUser(this.KIND__EMAIL, email);
    }

    private DocumentSnapshot getUser(String kind, String info) throws Exception {
        Firestore fs = FirestoreClient.getFirestore();

        CollectionReference collectionRef = fs.collection(COLLECTION__USER);

        Query query = collectionRef.whereEqualTo(kind, info);

        ApiFuture<QuerySnapshot> apiFuture = query.get();
        
        QuerySnapshot result = apiFuture.get();

        List<QueryDocumentSnapshot> docList = result.getDocuments();
        
        if(docList.isEmpty()) return null;

        DocumentSnapshot ret = docList.get(0);
        
        return ret;
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
