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
import knutu.knutu.Service.lib.classes.stdictLib.StdictLib;

public class GameSceneService {

    public static GameSceneService service = new GameSceneService();
    public static GameSceneService accessInstance() { return service; }

    // private StdictLib libInstance = StdictLib.getstdictLibInstance();

    private Gson gson = new GsonBuilder().setPrettyPrinting().create();
    private GameSceneInstances instances = GameSceneInstances.accessInstance();

    private Map<String, Room> gameRooms = LobbySceneInstances.accessInstance().gameRooms;

    public Map<String, String> userNameBySession = instances.userNameBySession;
    public Map<String, Session> sessionByUserName = instances.sessionByUserName;
    public Map<String, String> roomIdByUserName = instances.roomIdByUserName;

    public String onRequestRoomInfo(Session _session, JSONObject _requestPacket) throws Exception  {
        return simpleRoomReturn(_session, _requestPacket);
    }

    public String onSubmitSessionInfo(Session _session, JSONObject _requestPacket) throws Exception {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));
        String userName = (String) requestedPayload.get("userName");

        this.userNameBySession.put(_session.getId(), userName);
        this.sessionByUserName.put(userName, _session);
        this.roomIdByUserName.put(userName, roomId);

        return simpleRoomReturn(_session, _requestPacket);
    }

    public String onRequestExitRoom(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        Room room = LobbySceneService.accessInstance().getRoom(roomId);
        
        if(this.userNameBySession.containsKey(_session.getId())) {
            String userName = this.userNameBySession.get(_session.getId());
            this.userNameBySession.remove(_session.getId());
            this.roomIdByUserName.remove(userName);
            this.sessionByUserName.remove(userName);
        
            List<Player> players = new LinkedList<Player>();

            for(Player player : room.getPlayers()) {
                if(player.getName().equals(userName)) continue;
                players.add(player);
            }

            if(!players.isEmpty()) {
                room.setPlayers(players);
                String ret = gson.toJson(room);
                return ret;
            }

            this.gameRooms.remove(roomId);
            return null;
        }

        return null;
    }

    public Collection<Session> getSessionsInRoom(String _roomId) {
        return this.sessionByUserName.values();
    }

    public String getRoomIdUserNameBelongs(String _userName) {
        return this.roomIdByUserName.get(_userName);
    }

    public String getRoomIdSessionBelongs(Session _session) {
        return this.getRoomIdUserNameBelongs(this.userNameBySession.get(_session.getId()));
    }

    public boolean isUserLoggedIn(String _userName) {
        return this.sessionByUserName.get(_userName) != null;
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

            Room room = this.gameRooms.get(roomId);

            if(this.checkAllPlayerReady(room.getPlayers())) {
                this.broadCastAllPlayerReady(roomId);
                List<Player> players = room.getPlayers();
                for (Player player : players) {
                    player.setReady(false);
                }

                room.setGaming(true);
                room.setPlayers(players);

                this.gameRooms.put(roomId, room);
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
        int rounds = room.getRounds();

        String roundWord = "";

        switch(rounds) {
            case 2:
                roundWord = "안녕";
                break;
            case 3:
                roundWord = "민경호";
                break;
            case 4:
                roundWord = "강민공주";
                break;
            case 5:
                roundWord = "소프트웨어";
                break;
            case 6:
                roundWord = "황여진학회장";
                break;
            case 7:
                roundWord = "한국교통대학교";
                break;
            case 8:
                roundWord = "충북충주대소원면";
                break;
            case 9:
                roundWord = "서울고속버스터미널";
                break;
        }

        room.setRoundWord(roundWord);
        this.gameRooms.put(roomId, room);

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

                if(room.getCurrRound() == -1) {
                    room.setCurrRound(1);
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

    public String onReadyToRoundStart(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            this.togglePlayerRoundReady(roomId, userName);
            Room room = this.gameRooms.get(roomId);

            if(this.checkAllPlayerRoundReady(room.getPlayers())) {
                List<Player> players = room.getPlayers();
                for (Player player : players) {
                    player.setReady(false);
                }

                return gson.toJson(room);
            }
            return null;
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            throw new NullPointerException("Error on onReadyToRoundStart");
        }
    }

    public String[] onWordSubmit(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));
        String word = (String) requestedPayload.get("word");

        String queryResult = StdictLib.getstdictLibInstance().simpleQuery(word);

        String[] ret = new String[2];

        if(queryResult.equals("")) {
            ret[0] = "incorrect";
            ret[1] = null;
        } else {
            ret[0] = "correct";
            ret[1] = queryResult;
        }

        return ret;
    }

    public String onRoundEnd(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        // try {
        //     this.togglePlayerReady(roomId, userName);

        //     Room room = this.gameRooms.get(roomId);

        //     if(this.checkAllPlayerReady(room.getPlayers())) {
        //         this.broadCastAllPlayerReady(roomId);
        //         List<Player> players = room.getPlayers();
        //         for (Player player : players) {
        //             player.setReady(false);
        //         }

        //         room.setGaming(true);
        //         room.setPlayers(players);

        //         this.gameRooms.put(roomId, room);
        //     }

        //     return this.getSessionsInRoom(roomId);
        // } catch(Exception e) {
        //     e.getCause();
        //     e.printStackTrace();
        //     return null;
        // }

        return null;
    }

    public String onTurnProcess(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            this.togglePlayerRoundReady(roomId, userName);
            Room room = this.gameRooms.get(roomId);

            if(this.checkAllPlayerRoundReady(room.getPlayers())) {
                List<Player> players = room.getPlayers();
                boolean turnFlag = false;
                boolean isLastPlayer = true;
                String firstPlayerName = null;

                for (Player player : players) {
                    player.setReady(false);
                    if(firstPlayerName == null) {
                        firstPlayerName = player.getName();
                    }
                    if(turnFlag) {
                        room.setCurrTurn(player.getName());
                        isLastPlayer = false;
                    }
                    if(turnFlag == false && room.getCurrTurn().equals(player.getName())) {
                        turnFlag = true;
                    }
                }

                if(isLastPlayer == true) {
                    room.setCurrTurn(firstPlayerName);
                }

                return gson.toJson(room);
            }
            return null;
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            throw new NullPointerException("Error on onReadyToRoundStart");
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
