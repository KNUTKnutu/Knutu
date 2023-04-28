package knutu.knutu.Service.lib.classes.Channel;

import java.util.Collection;

import knutu.knutu.Service.lib.classes.Chat.Chat;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Channel {
    private String name;
    private int userCount;
    private Collection<Chat>    chats;  // 이 채널 안에서 오고간 채팅의 모음     

    public Channel(String channelName) {
        this.name = channelName;
        this.userCount = 0;
    }
}