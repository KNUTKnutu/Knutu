package knutu.knutu.Service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.storage.Storage.Projects.ServiceAccount;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.cloud.StorageClient;

@Service
public class FirebaseService {
    
    @Value("${app.firebase-bucket}")
    private String bucket;
    // private FirebaseApp firebaseApp;
    private Bucket firebaseBucket; // storage

    // private void initFirebaseApp() {
    //     if(firebaseApp == null) {
    //     }
    // }

    private void initBucket() {
        if(firebaseBucket == null) {
            firebaseBucket = StorageClient.getInstance().bucket(bucket);
        }
    }

    public String uploadFile(MultipartFile file, String fileName) throws IOException, FirebaseAuthException {
        initBucket();
        
        InputStream content = new ByteArrayInputStream(file.getBytes());
        Blob blob = firebaseBucket.create(fileName.toString(), content, file.getContentType());

        return blob.getMediaLink();
    }
}
