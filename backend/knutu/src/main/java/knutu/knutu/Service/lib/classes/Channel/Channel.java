package knutu.knutu.Service.lib.classes.Channel;

import java.util.Map;

import knutu.knutu.Service.lib.classes.User.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Channel {
    private String name;
    private Map<String, User> onlineUsers;

    public Channel(String channelName) {
        this.name = channelName;
    }
}