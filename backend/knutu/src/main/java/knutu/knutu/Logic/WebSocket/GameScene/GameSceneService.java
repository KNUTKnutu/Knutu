package knutu.knutu.Logic.WebSocket.GameScene;

import java.time.Instant;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONObject;

import com.google.api.gax.rpc.OutOfRangeException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneInstances;
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.Player.Player;
import knutu.knutu.Service.lib.classes.User.User;
import knutu.knutu.Service.lib.classes.stdictLib.StdictLib;

public class GameSceneService {

    public static GameSceneService service = new GameSceneService();
    public static GameSceneService accessInstance() { return service; }

    private StdictLib libInstance = StdictLib.getstdictLibInstance();

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private GameSceneInstances instances = GameSceneInstances.accessInstance();

    private Map<String, User> onlineUsers = instances.onlineUsers;
    private Map<String, Room> gameRooms = LobbySceneInstances.accessInstance().gameRooms;
    
    public Map<String, Collection<Session>> sessionsInRoom = instances.sessionsInRoom;
    public Map<String, String> userLocationMapWithName = instances.userLocationMapWithName;
    public Map<String, String> userLocationMapWithSessionID = instances.userLocationMapWithName;
    public Map<String, String> userNameBySession = instances.userNameBySession;

    public String onRequestRoomInfo(Session _session, JSONObject _requestPacket) throws Exception  {
        return simpleRoomReturn(_session, _requestPacket);
    }

    public String onSubmitSessionInfo(Session _session, JSONObject _requestPacket) throws Exception {
        return simpleRoomReturn(_session, _requestPacket);
    }

    public String onRequestExitRoom(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));
        
        if(this.userLocationMapWithName.containsKey(userName)) {
            this.userLocationMapWithName.remove(this.userLocationMapWithName.get(userName));
            this.userLocationMapWithSessionID.remove(_session.getId());
            for(Session session : this.sessionsInRoom.get(roomId)) {
                if(!session.getId().equals(_session.getId())) continue;
                this.sessionsInRoom.get(roomId).remove(session);
                break;
            }
        }

        Room room = LobbySceneService.accessInstance().getRoom(roomId);
        String ret = gson.toJson(room);

        return ret;
    }

    public void saveSessionInfoToRoom(Session _session, JSONObject _requestPacket) throws Exception {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        this.userLocationMapWithName.put(userName, roomId);
        this.userLocationMapWithSessionID.put(_session.getId(), roomId);
        this.userNameBySession.put(_session.getId(), userName);

        Collection<Session> sessions = this.sessionsInRoom.get(roomId);

        if(sessions == null) {
            sessions = new LinkedList<Session>();
        }

        if(sessions.add(_session)) {
            this.sessionsInRoom.put(roomId, sessions);
        }
    }

    public Collection<Session> getSessionsInRoom(String roomId) {
        return this.sessionsInRoom.get(roomId);
    }

    public String getRoomIdSessionBelongs(Session _session) {
        return this.userLocationMapWithSessionID.get(_session.getId());
    }

    public String onRequestToggleReady(Session _session, JSONObject _requestPacket) {
        return simpleRoomReturn(_session, _requestPacket);
    }

    public Collection<Session> onPlayerReady(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            this.togglePlayerReady(roomId, userName);

            if(this.checkAllPlayerReady(this.gameRooms.get(roomId).getPlayers())) {
                this.broadCastAllPlayerReady(roomId);
                List<Player> players = this.gameRooms.get(roomId).getPlayers();
                for (Player player : players) {
                    player.setReady(false);
                }

                this.gameRooms.get(roomId).setPlayers(players);
            }

            return this.getSessionsInRoom(roomId);
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            return null;
        }
    }

    private void broadCastAllPlayerReady(String roomId) throws Exception {
        Collection<Session> sessions = this.getSessionsInRoom(roomId);

        Room room = this.gameRooms.get(roomId);
        Short rounds = room.getRounds();

        String roundWord = "";

        switch(rounds.toString()) {
            case "2":
                roundWord = "안녕";
                break;
            case "3":
                roundWord = "민경호";
                break;
            case "4":
                roundWord = "강민공주";
                break;
            case "5":
                roundWord = "소프트웨어";
                break;
            case "6":
                roundWord = "황여진학회장";
                break;
            case "7":
                roundWord = "한국교통대학교";
                break;
            case "8":
                roundWord = "충북충주대소원면";
                break;
            case "9":
                roundWord = "서울고속버스터미널";
                break;
        }

        String packet = "{\"header\": {\"type\": \"" + "allPlayerReady" + "\", \"timestamp\": \"" + Instant.now().toEpochMilli() + "\"}, \"payload\": {\"data\": {\"allPlayerReady\": true, \"roundWord\": \"" + roundWord + "\"}}}";
        
        for(Session session : sessions) {
            session.getBasicRemote().sendText(packet);
        }
    }

    public String onReadyToProcessRound(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            this.togglePlayerRoundReady(roomId, userName);
            Room room = this.gameRooms.get(roomId);

            if(this.checkAllPlayerRoundReady(room.getPlayers())) {
                List<Player> players = room.getPlayers();
                Player firstPlayer = null;
                for (Player player : players) {
                    if(firstPlayer == null) {
                        firstPlayer = player;
                    }
                    player.setReady(false);
                }

                if(room.getCurrRound() == null) {
                    room.setCurrRound(Short.parseShort("1"));
                    room.setCurrTurn(firstPlayer.getName());
                }

                return gson.toJson(room);
            }
            return null;
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            throw new NullPointerException("Error on onReadyToProcessRound");
        }
    }

    private void togglePlayerReady(String _roomId, String _playerName) {
        Room room = this.gameRooms.get(_roomId);
        List<Player> gamers = room.getPlayers();

        for(Player player: gamers) {
            if(!player.getName().equals(_playerName)) continue;
            player.setReady(!player.isReady()); 
            break;
        }

        room.setPlayers(gamers);
    }

    private void togglePlayerRoundReady(String _roomId, String _playerName) {
        Room room = this.gameRooms.get(_roomId);
        List<Player> gamers = room.getPlayers();

        for(Player player: gamers) {
            if(!player.getName().equals(_playerName)) continue;
            player.setRoundReady(!player.isRoundReady()); 
            break;
        }

        room.setPlayers(gamers);
    }

    private boolean checkAllPlayerReady(List<Player> _players) {
        if(_players.size() <= 1) return false;
        for (Player player: _players) {
            if(!player.isReady())
                return false;
        }
        return true;
    }

    private boolean checkAllPlayerRoundReady(List<Player> _players) {
        if(_players.size() <= 1) throw new OutOfRangeException("Player size is invalid", null, null, false);
        for (Player player: _players) {
            if(!player.isRoundReady())
                return false;
        }
        return true;
    }

    private String simpleRoomReturn(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        int roomId = Integer.parseInt(Long.toString((long) requestedPayload.get("roomId")));

        Room room = LobbySceneService.accessInstance().getRoom(roomId);
        String ret = gson.toJson(room);

        return ret;
    }
}
