package knutu.knutu.Logic.WebSocket.GameScene;

import java.util.List;
import java.util.Map;

import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.Player.Player;
import knutu.knutu.Service.lib.classes.User.User;

public class GameSceneService {

    public static GameSceneService service = new GameSceneService();
    public static GameSceneService getInstance() { return service; }

    private GameSceneInstances instances = GameSceneInstances.getInstance();

    private Map<String, User> onlineUsers = instances.onlineUsers;
    private Map<String, Room> gameRooms = instances.gameRooms;
    
    public boolean quitRoom(Room room, Player player) {
        try {
            Room gameRoom = gameRooms.get(room.getTitle());
            List<Player> gamers = gameRoom.getPlayers();
            gamers.remove(player);

            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
