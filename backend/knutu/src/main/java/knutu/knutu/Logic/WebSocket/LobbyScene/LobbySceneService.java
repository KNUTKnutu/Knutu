package knutu.knutu.Logic.WebSocket.LobbyScene;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONObject;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Logic.Library.JSONBeautifier;
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
    public Map<String, String> userNameBySession = instances.userNameBySession;
    public Map<String, String> gamingUsers = instances.gamingUsers;
    public Map<String, Channel> availableChannels = instances.availableChannels;

    private boolean isInitialized = false;
    
    public String onLobbyEntrance(Session _session, JSONObject _requestPacket) throws Exception {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        JSONObject requestedUser = (JSONObject) requestedPayload.get("user");
        String name = requestedUser.get("name").toString();

        this.userNameBySession.put(_session.getId(), name);

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
            channel.setUserCount(channel.getUserCount() + 1);
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

            gamingUsers.put(user.getName(), Integer.toString(roomId));         

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
                gamingUsers.remove(player.getName());
                break;
            }

            User user = FirebaseService.getFirebaseInstance().getUserWithName(userName);
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

    public void exitRoomByUserName(String userName) {
        try {
            String roomId = gamingUsers.get(userName);
            this.exitRoom(Integer.parseInt(roomId), userName);
        } catch (Exception e) {
            e.getCause();
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
            Map<String, Room> rooms = LobbySceneService.getInstance().getCurrentRooms();
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
            Channel channel = this.getChannelInfo("K");
            Gson gson = new GsonBuilder().create();
            String finalizedJSON = JSONBeautifier.finalizeJSON("currentChannelInfo", gson.toJson(channel));
            _session.getBasicRemote().sendText(finalizedJSON);
            return true;
        } catch(Exception e) {
            return false;
        }
    }


    public boolean isUserLoggedIn(String userName) {
        if(onlineUsers.get(userName) != null) return true;
        return false;
    }

    public boolean logOut(String userName) {
        try {
            for(User user : this.onlineUsers.values()) {
                if(user.getName().equals(userName))
                    this.onlineUsers.remove(userName);
            }

            Channel K =  this.availableChannels.get("K");
            K.getOnlineUsers().remove(userName);
            this.availableChannels.put("K", K);

            this.gamingUsers.remove(userName);

            return true;
        } catch (Exception e) {
            e.getCause();
            return false;
        }
    }

    public boolean onSessionClosed(String userName) {
        try {
            Channel K =  this.availableChannels.get("K");
            K.setUserCount(K.getUserCount() - 1);
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
