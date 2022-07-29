package knutu.knutu.Controller.Game;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.User.User;

@RestController
public class GameController {
    
    @PostMapping("/makeRoom")
    public boolean makeRoom(@RequestParam Room room) throws Exception {
        return LobbySceneService.getInstance().makeRoom(room);
    }

    @GetMapping("/enterRoom")
    public boolean enterRoom(@RequestParam Room room, @RequestParam User user) {
        return LobbySceneService.getInstance().enterRoom(room, user);
    }
}
