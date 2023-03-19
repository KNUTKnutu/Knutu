package knutu.knutu.Logic.WebSocket.GameScene;

import java.time.Instant;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

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
    public static GameSceneService getInstance() { return service; }

    private StdictLib libInstance = StdictLib.getstdictLibInstance();

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private GameSceneInstances instances = GameSceneInstances.getInstance();

    private Map<String, User> onlineUsers = instances.onlineUsers;
    private Map<String, Room> gameRooms = LobbySceneInstances.getInstance().gameRooms;
    
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

        LobbySceneService lobbySceneInstance = LobbySceneService.getInstance();

        User user = lobbySceneInstance.getUserByUserName(userName);
        System.out.println(userName);
        System.out.println(user);
        if(user != null)
            lobbySceneInstance.enterChannel(user, "K");
        
        Room room = lobbySceneInstance.getRoom(roomId);

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
            }

            return this.getSessionsInRoom(roomId);
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            return null;
        }
    }

    public String onRequestRoundStart(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            Room room = this.gameRooms.get(this.getRoomIdSessionBelongs(_session));
            if(room != null) {
                List<Player> players = room.getPlayers();

                for(Player player : players) {
                    if(player.getName().equals(userName)) {
                        player.setReadyToProcessRound(true);
                        break;
                    }
                }

                for(Player player : players) {
                    if(!player.isReadyToProcessRound()) {
                        return "{}";
                    }
                }
                
                // 위 리턴에 걸리지 않았다면 모든 플레이어가 라운드를 진행할 준비가 된 것으로 간주.
                // 방 내에 있는 모든 세션에 round Start 되었다는 broadcast를 돌리고, 라운드를 시작.

                // 1) broadcasting
                long timestamp = Instant.now().toEpochMilli();
                Collection<Session> sessions = this.getSessionsInRoom(roomId);
                String packet = "{\"header\": {\"type\": \"" + "onRoundStart" + "\", \"timestamp\": \"" + timestamp + "\"}, \"payload\": {\"data\": {}}}";

                for (Session session : sessions) {
                    session.getBasicRemote().sendText(packet);
                }

                // 2) logically start game
                room.setExpireTimeToken(timestamp + room.getRemainTime());
                /* todo */
            }

            return "{}";
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            return null;
        }
    }

    public String onRequestSubmitWord(Session _session, JSONObject _requestPacket) throws Exception {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String word = (String) requestedPayload.get("word");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        // 해당 턴을 진행 중인 유저가 맞는 지 Validate
        Room room = this.gameRooms.get(roomId);
        if(!room.getPlayers().get(room.getTurn()).getName().equals(userName))
        return "{\"validation\": \"passed\", \"correct\": \"" + null + "\", \"inputWord\": \"" + word + "\", \"queryResult\": \"" + null + "\"}";

        // 그런 단어가 표준국어대사전에 있는 지 확인
        JSONParser jsonParser = new JSONParser();

        String queryWord = StdictLib.getstdictLibInstance().simpleQuery(word);
        boolean isCorrect = !queryWord.isEmpty();

        // 단어가 존재하지 않으면
        if(isCorrect == false) {
            return "{\"validation\": \"passed\", \"correct\": \"" + isCorrect + "\", \"inputWord\": \"" + word + "\", \"queryResult\": \"" + null + "\"}";
        }

        // 단어가 존재하면
        JSONObject queryJSON = (JSONObject) jsonParser.parse(queryWord);
        JSONObject channel = (JSONObject) queryJSON.get("channel");
        JSONArray items = (JSONArray) channel.get("item");

        JSONObject item = (JSONObject) items.get(0);
        String confirmedWord = (String) item.get("word");

        // 최근에 입력된 단어와, 단어의 첫 글자를 room 정보에 저장
        room.setCurrWord(confirmedWord);
        room.setStartWord(confirmedWord.substring(0, 1));
        if(room.getTurn() + 1 == room.getPlayers().size()) 
            room.setTurn(Short.parseShort("0"));
        else room.setTurn(Short.parseShort(Integer.toString(room.getTurn() + 1)));

        return "{\"validation\": \"passed\", \"correct\": \"" + isCorrect + "\", \"inputWord\": \"" + word + "\", \"queryResult\": \"" + confirmedWord + "\"}";
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

        room.setRoundWord(roundWord);
        room.setStartWord(roundWord.substring(0, 1));

        String packet = "{\"header\": {\"type\": \"" + "allPlayerReady" + "\", \"timestamp\": \"" + Instant.now().toEpochMilli() + "\"}, \"payload\": {\"data\": {\"allPlayerReady\": true, \"roundWord\": \"" + roundWord + "\"}}}";
        
        for(Session session : sessions) {
            session.getBasicRemote().sendText(packet);
        }
    }

    private void togglePlayerReady(String roomId, String playerName) {
        Room room = this.gameRooms.get(roomId);
        List<Player> gamers = room.getPlayers();

        for(Player player: gamers) {
            if(!player.getName().equals(playerName)) continue;
            player.setReady(!player.isReady()); 
            break;
        }

        room.setPlayers(gamers);
    }

    private boolean checkAllPlayerReady(List<Player> players) {
        if(players.size() <= 1) return false;
        for (Player player: players) {
            if(!player.isReady())
                return false;
        }
        return true;
    }

    private String simpleRoomReturn(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        int roomId = Integer.parseInt(Long.toString((long) requestedPayload.get("roomId")));

        Room room = LobbySceneService.getInstance().getRoom(roomId);
        String ret = gson.toJson(room);

        return ret;
    }
}
