package knutu.knutu.Controller.Game;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Controller.Exceptions.Conflict;
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.User.User;

@RestController
public class GameController {
    @PostMapping("/makeRoom")
    public boolean makeRoom(@RequestBody Room room) throws Exception {
        return LobbySceneService.getInstance().makeRoom(room);
    }

    @GetMapping("/getAvailableRoomId")
    public int getAvailableRoomId() throws Exception {
        return LobbySceneService.getInstance().getAvailableRoomId();
    }

    @GetMapping("/checkRoomEnterable")
    public boolean checkRoomEnterable(@RequestParam int roomId) throws Exception {
        boolean isRoomEnterable = LobbySceneService.getInstance().checkRoomEnterable(roomId);
        if(!isRoomEnterable) throw new Conflict("The room is not enterable now.");
        return true;
    }

    @PostMapping("/enterRoom")
    public Room enterRoom(@RequestParam int roomId, @RequestBody User user) {
        return LobbySceneService.getInstance().enterRoom(user, roomId);
    }

    @PutMapping("/exitRoom")
    public boolean exitRoom(@RequestParam int roomId, @RequestParam String userName) {
        return LobbySceneService.getInstance().exitRoom(roomId, userName);
    }
}
