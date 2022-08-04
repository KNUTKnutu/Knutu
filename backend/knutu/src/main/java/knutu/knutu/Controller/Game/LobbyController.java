package knutu.knutu.Controller.Game;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;

import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.Channel.Channel;

public class LobbyController {

    @GetMapping("/getChannelInfos")
    public Collection<Channel> enterRoom() {
        return LobbySceneService.getInstance().getChannelInfos();
    }
}
