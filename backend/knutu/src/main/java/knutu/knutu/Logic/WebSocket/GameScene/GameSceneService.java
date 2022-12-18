package knutu.knutu.Logic.WebSocket.GameScene;

import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.Player.Player;
import knutu.knutu.Service.lib.classes.User.User;

public class GameSceneService {

    public static GameSceneService service = new GameSceneService();
    public static GameSceneService getInstance() { return service; }

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
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

    public String onRequestRoomInfo(Session _session, JSONObject _requestPacket) throws Exception  {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        long requestedRoomId = (long) requestedPayload.get("roomId");

        Room room = LobbySceneService.getInstance().getRoom(Integer.parseInt(Long.toString(requestedRoomId)));
        String ret = gson.toJson(room);

        return ret;
    }
}
