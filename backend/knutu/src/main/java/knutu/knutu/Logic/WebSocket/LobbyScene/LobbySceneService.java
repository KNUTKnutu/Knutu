package knutu.knutu.Logic.WebSocket.LobbyScene;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.Channel.Channel;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.Player.Player;
import knutu.knutu.Service.lib.classes.User.User;

public class LobbySceneService {

    public static LobbySceneService service = new LobbySceneService();
    public static LobbySceneService getInstance() { return service; }
    
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private LobbySceneInstances instances = LobbySceneInstances.getInstance();
    private Map<String, User> onlineUsers = instances.onlineUsers;
    private Map<String, Room> gameRooms = instances.gameRooms;
    public Map<String, Channel> availableChannels = instances.availableChannels;

    private boolean isInitialized = false;
    
    public String onLobbyEntrance(Session _session, JSONObject _requestPacket) throws Exception {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        JSONObject requestedUser = (JSONObject) requestedPayload.get("user");
        String name = requestedUser.get("name").toString();

        User user = FirebaseService.getFirebaseInstance().getUserWithName(name);
        onlineUsers.put(user.getName(), user);

        String ret = gson.toJson(user);

        return ret;
    }

    public Channel getChannelInfo(String channelName) {
        return this.availableChannels.get(channelName);
    }

    public Collection<Channel> getChannelInfos() {
        if(this.isInitialized == false) {
            this.initialize();
            this.isInitialized = true;
        }

        return this.availableChannels.values();
    }

    public boolean enterChannel(User user, String channelName) {
        try {
            Channel channel = this.availableChannels.get(channelName);
            channel.addUserOnline(user);
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean makeRoom(Room room) {
        try {
            gameRooms.put(room.getTitle(), room);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public boolean enterRoom(Room room, User user) {
        try {
            Player enteredPlayer = new Player();
            enteredPlayer.setName(user.getName());
            enteredPlayer.setTitle(user.getTitle());
            enteredPlayer.setProfileFicture(user.getProfilePicture());
            enteredPlayer.setLevel(user.getLevel());
            enteredPlayer.setCurrentExperience(user.getCurrentExperience());
            enteredPlayer.setAccountgaemaeneo(false); // user.getAccountgaemaeneo 가 안돼서 일단 보류

            Room gameRoom = gameRooms.get(room.getTitle());
            List<Player> gamers = gameRoom.getPlayers();
            gamers.add(enteredPlayer);
            gameRoom.setPlayers(gamers);

            return true;

        } catch (Exception e){
            return false;
        }
    }

    private void initialize() {
        // Channels
            // K (From Phase I)
                Channel K = new Channel("K");
                this.availableChannels.put("K", K);
            // N (Maybe on Phase II)
    }
}
