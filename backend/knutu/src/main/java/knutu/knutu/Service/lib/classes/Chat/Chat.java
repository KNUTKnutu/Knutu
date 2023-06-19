package knutu.knutu.Service.lib.classes.Chat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Chat {
    private String sender;
    private String message;
    private long timestamp;

    public Chat(String _sender, String _message, long _timeStamp) {
        this.sender = _sender;
        this.message = _message;
        this.timestamp = _timeStamp;
    }
}
