package knutu.knutu.Logic.WebSocket.LobbyScene;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Controller.Exceptions.BadRequest;
import knutu.knutu.Logic.Library.JSONBeautifier;
import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.Channel.Channel;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.Player.Player;
import knutu.knutu.Service.lib.classes.User.User;

public class LobbySceneService {

    public static LobbySceneService service = new LobbySceneService();
    public static LobbySceneService accessInstance() { return service; }
    
    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private LobbySceneInstances instances = LobbySceneInstances.accessInstance();
    private Map<String, Room> gameRooms = instances.gameRooms;
    public Map<String, String> userNameBySession = instances.userNameBySession;
    public Map<String, Channel> availableChannels = instances.availableChannels;

    private boolean isInitialized = false;
    
    public String onLobbyEntrance(Session _session, JSONObject _requestPacket) throws Exception {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        JSONObject requestedUser = (JSONObject) requestedPayload.get("user");
        String name = requestedUser.get("name").toString();

        this.userNameBySession.put(_session.getId(), name);

        User user = FirebaseService.accessFirebaseInstance().getUserWithName(name);

        String ret = gson.toJson(user);

        return ret;
    }

    public Collection<User> getChannelInfo(String channelName) throws Exception {
        // return this.availableChannels.get(channelName);
        return this.getUsersInChannel();
    }

    public Collection<Channel> getChannelInfos() {
        if(this.isInitialized == false) {
            this.initialize();
            this.isInitialized = true;
        }

        Collection<Channel> _channels = new LinkedList<Channel>();

        for (Channel _channel : this.availableChannels.values()) {
            int _userCount = this.userNameBySession.values().size();
            _channel.setUserCount(_userCount);
            _channels.add(_channel);
        }

        return _channels;
    }

    public boolean enterChannel(User user, String channelName) {
        try {
            if(channelName == null || channelName.isEmpty()) throw new BadRequest("The given channel name is nullish or undefined");
            if(user == null || user.getName().isEmpty()) throw new BadRequest("User is invalid.");

            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Room getRoom(int roomId) {
        return gameRooms.get(Integer.toString(roomId));
    }

    public Room getRoom(String roomId) {
        return gameRooms.get(roomId);
    }

    public boolean makeRoom(Room room) {
        try {
            gameRooms.put(Short.toString(room.getNumber()), room);
            return true;
        } catch (Exception e){
            return false;
        }
    }

    public Room enterRoom(User user, int roomId) {
        try {
            Player enteredPlayer = new Player();
            enteredPlayer.setName(user.getName());
            enteredPlayer.setTitle(user.getTitle());
            enteredPlayer.setProfileFicture(user.getProfilePicture());
            enteredPlayer.setLevel(user.getLevel());
            enteredPlayer.setCurrentExperience(user.getCurrentExperience());
            enteredPlayer.setAccountgaemaeneo(false); // user.getAccountgaemaeneo 가 안돼서 일단 보류
            enteredPlayer.setReady(false);
            enteredPlayer.setScore(0);

            user.setInGame(true);

            Room gameRoom = gameRooms.get(Integer.toString(roomId));
            List<Player> gamers = gameRoom.getPlayers();
            gamers.add(enteredPlayer);
            gameRoom.setPlayers(gamers);

            Short currEntry = Short.parseShort(Integer.toString(Integer.parseInt(gameRoom.getCurrEntry().toString()) + Integer.parseInt("1")));
            gameRoom.setCurrEntry(currEntry);  

            return gameRoom;
        } catch (Exception e){
            e.getCause();
            e.printStackTrace();
            return null;
        }
    }

    public boolean exitRoom(int roomId, String userName) {
        try {
            Room gameRoom = gameRooms.get(Integer.toString(roomId));
            List<Player> Players = gameRoom.getPlayers();

            for(Player player : Players) {
                if(!player.getName().equals(userName)) continue;

                Players.remove(player);
                gameRoom.setPlayers(Players);
                gameRooms.put(Integer.toString(roomId), gameRoom);
                break;
            }

            User user = FirebaseService.accessFirebaseInstance().getUserWithName(userName);
            user.setInGame(false);

            Short currEntry = Short.parseShort(Integer.toString(Integer.parseInt(gameRoom.getCurrEntry().toString()) - Integer.parseInt("1")));
            gameRoom.setCurrEntry(currEntry);

            if(currEntry == 0) {
                gameRooms.remove(Integer.toString(roomId));
            }

            return true;
        } catch (Exception e){
            e.getCause();
            e.printStackTrace();
            return false;
        }
    }

    public int getAvailableRoomId() {
        int idx = 1;
        while(true) {
            Room gameRoom = gameRooms.get(Integer.toString(idx));
            if(gameRoom == null)
                return idx;
            idx++;
        }
    }

    public boolean checkRoomEnterable(int roomId) throws Exception {
        try {
            Room gameRoom = gameRooms.get(Integer.toString(roomId));
            if(gameRoom == null) return false;
            return gameRoom.getCurrEntry() != gameRoom.getMaxEntry() ? true : false;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    public Map<String, Room> getCurrentRooms() throws Exception {
        return this.gameRooms;
    }

    public boolean sendCurrentRooms(Session _session) {
        try {
            Map<String, Room> rooms = LobbySceneService.accessInstance().getCurrentRooms();
            Gson gson = new GsonBuilder().create();
            String finalizedJSON = JSONBeautifier.finalizeJSON("currentRooms", gson.toJson(rooms));
            _session.getBasicRemote().sendText(finalizedJSON);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    public boolean sendCurrentChannelInfo(Session _session) {
        try {
            Collection<User> users = this.getUsersInChannel();
            String finalizedJSON = JSONBeautifier.finalizeJSON("currentChannelInfo", gson.toJson(users));
            _session.getBasicRemote().sendText(finalizedJSON);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    public Collection<User> getUsersInChannel() throws Exception {
        Collection<User> users = new LinkedList<User>();
        for (String userName : this.userNameBySession.values()) {
            User user = FirebaseService.accessFirebaseInstance().getUserWithName(userName);
            if(user != null) {
                users.add(user);
            }
        }
        return users;
    }

    public boolean isUserLoggedIn(String _userName) {

        for(String userName : userNameBySession.values()) {
            if(userName.equals(_userName)) return true;
        }
        return false;
    }

    public boolean logOut(String userName) {
        try {
            return true;
        } catch (Exception e) {
            e.getCause();
            return false;
        }
    }

    public boolean onSessionClosed(String sessionId) {
        try {
            this.userNameBySession.remove(sessionId);
            return true;
        } catch (Exception e) {
            e.getCause();
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
