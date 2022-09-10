package knutu.knutu.Service.lib.classes.Channel;

import java.util.HashMap;
import java.util.Map;

import knutu.knutu.Service.lib.classes.User.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Channel {
    private String name;
    private Map<String, User> onlineUsers = new HashMap<String, User>();
    private int userCount;

    public Channel(String channelName) {
        this.name = channelName;
        this.userCount = 0;
    }

    public void channelOut() {
        this.userCount--;
    }

    public void addUserOnline(User user) {
        this.onlineUsers.put(user.getName(), user);
    }
}