package knutu.knutu.Logic.Library;

public class JSONBeautifier {
    public static String finalizeJSON(String headerType, String body) {
        String prefix = "{\"header\": {\"type\": \"" + headerType + "\"}, \"body\": ";
        String suffix = "}";
        return prefix + body + suffix;
    }
}
