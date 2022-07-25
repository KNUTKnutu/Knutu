package knutu.knutu.Service.lib.classes.stdictLib;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;

import knutu.knutu.Service.lib.privates.privates;

@Service
public class StdictLib {
    public static final StdictLib stdictLibInstance = new StdictLib();
    public static StdictLib getstdictLibInstance() { return stdictLibInstance; }

    private static final String authKey = privates.stdictAuthKey;

    private HttpURLConnection conn = null;
    private BufferedReader bufferedReader = null;
    private StringBuffer stringBuffer = null;

    /**
     * Makes a query to stdict, with shorthand way.  
     * Throws a HTTP Request with GET method to stdict to get JSON response.
     * 
     * @param1 Word to query.
     * @return Response data with JSONObject type.
     */
    public String simpleQuery(String word) {
        
        try {
            final URL URL = new URL(String.format("https://stdict.korean.go.kr/api/search.do?key=%s&q=%s", authKey, word));
            final String METHOD = "GET";

            conn = (HttpURLConnection) URL.openConnection();
            
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestMethod(METHOD);

            conn.connect();

            bufferedReader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
            stringBuffer = new StringBuffer();

            String responseData;

            while((responseData = bufferedReader.readLine()) != null) {
                stringBuffer.append(responseData);
            }

            if (bufferedReader != null) 
                bufferedReader.close();

            return stringBuffer.toString();

        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (bufferedReader != null) 
                    bufferedReader.close();
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                return "뭔가 잘못 되었을 걸? ㅎㅎ";
            }
        }
    }
}