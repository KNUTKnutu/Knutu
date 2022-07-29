package knutu.knutu.Service.lib.classes.stdictLib;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLEncoder;

import javax.net.ssl.HttpsURLConnection;

import org.springframework.stereotype.Service;

import knutu.knutu.Service.lib.privates.privates;

@Service
public class StdictLib {
    public static final StdictLib stdictLibInstance = new StdictLib();
    public static StdictLib getstdictLibInstance() { return stdictLibInstance; }

    private static final String authKey = privates.stdictAuthKey;

    /**
     * Makes a query to stdict, with shorthand way.  
     * Throws a HTTP Request with GET method to stdict to get JSON response.
     * 
     * @param1 Word to query.
     * @return Response data with JSONObject type.
     */
    public String simpleQuery(String word) {
        
        try {
            final Short num = 10;
            final Short start = 1;
            final String req_type = "json";
            final String q = URLEncoder.encode(word, "UTF-8");
            final String url = String.format("https://stdict.korean.go.kr/api/search.do?key=%s&req_type=%s&num=%d&start=%d&q=%s",
                                                                                                authKey, req_type, num, start, q);
            final URL URL = new URL(url);
            final String METHOD = "GET";

            HttpsURLConnection conn = (HttpsURLConnection) URL.openConnection();
            
            conn.setUseCaches(false);
            conn.setReadTimeout(10000);
            conn.setRequestMethod(METHOD);

            conn.connect();

            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            StringBuffer stringBuffer = new StringBuffer();

            String responseData;

            while((responseData = bufferedReader.readLine()) != null) {
                stringBuffer.append(responseData);
            }

            if (bufferedReader != null) 
                bufferedReader.close();

            return stringBuffer.toString();

        } catch (IOException e) {
            e.printStackTrace();
            return "error";
        } 
    }
}