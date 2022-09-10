package knutu.knutu.Controller.Game;

import java.util.Collection;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.Channel.Channel;
import knutu.knutu.Service.lib.classes.User.User;

@RestController
public class LobbyController {

    @GetMapping("/getChannelInfos")
    public Collection<Channel> getChannelInfos() {
        return LobbySceneService.getInstance().getChannelInfos();
    }

    @GetMapping("/getChannelInfo")
    public Channel getChannelInfo(@RequestParam("channelName") String channelName) {
        return LobbySceneService.getInstance().getChannelInfo(channelName);
    }

    @PutMapping("/enterChannel/{channelName}")
    public boolean enterChannel(@RequestBody User user, @PathVariable String channelName) {
        return LobbySceneService.getInstance().enterChannel(user, channelName);
    }
}
