package knutu.knutu.Logic.WebSocket.GameScene;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.websocket.Session;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import com.google.api.gax.rpc.OutOfRangeException;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneInstances;
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.Chat.Chat;
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

    public String onChatSubmitOnGameScene(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));
        String chatter = (String) requestedPayload.get("chatter");
        String chatMessage = (String) requestedPayload.get("chatMessage");
        long chatTime = ((long) requestedPayload.get("chatTime"));

        Chat chat = new Chat(chatter, chatMessage, chatTime);

        Room room = LobbySceneService.accessInstance().getRoom(roomId);
        Collection<Chat> currChats = room.getChats();
        if(currChats == null) {
            currChats = new ArrayList<Chat>();
        }
        currChats.add(chat);
        room.setChats(currChats);

        return gson.toJson(room);
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
                    player.setGameReady(false);
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
                if(room.getCurrRound() == room.getRounds()) {
                    // 게임이 끝남
                    room.setGaming(false);
                    return gson.toJson(room);
                }

                List<Player> players = room.getPlayers();
                Player firstPlayer = null;
                for (Player player : players) {
                    if(firstPlayer == null) {
                        firstPlayer = player;
                    }
                    player.setRoundReady(false);
                }

                if(room.getCurrRound() == -1) {
                    room.setCurrRound(1);
                    room.setCurrTurn(firstPlayer.getName());
                } else {
                    room.setCurrRound(room.getCurrRound() + 1);
                }

                room.setCurrWord(String.valueOf(room.getRoundWord().charAt(room.getCurrRound() - 1)));

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
            this.togglePlayerRoundStartReady(roomId, userName);
            Room room = this.gameRooms.get(roomId);

            if(this.checkAllPlayerRoundStartReady(room.getPlayers())) {
                List<Player> players = room.getPlayers();
                for (Player player : players) {
                    player.setRoundStartReady(false);
                }

                room.setRemainRoundTime(room.getLimitTime() * 200);

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
        int expiredTime = (int) ((long) requestedPayload.get("expiredTime"));

        String queryResult = StdictLib.getstdictLibInstance().simpleQuery(word);

        String[] ret = new String[2];

        if(queryResult.equals("")) {
            ret[0] = "incorrect";
            ret[1] = "'" + word + "'";
        } else {
            Room room = this.gameRooms.get(roomId);

            try {
                JSONParser parser = new JSONParser();
                JSONObject payload = (JSONObject) parser.parse(queryResult);
                JSONObject channel = (JSONObject) payload.get("channel");
                JSONArray items = (JSONArray) channel.get("item");
                if(items.size() > 0) {
                    JSONObject item = (JSONObject) items.get(0);

                    if(item.containsKey("word")) {
                        JSONObject bodyData = new JSONObject();
                        String wordToReturn = (String) item.get("word");
                        String part = (String) item.get("pos"); // 품사

                        JSONObject sense = (JSONObject) item.get("sense");
                        String definition = (String) sense.get("definition");
                        
                        bodyData.put("word", wordToReturn);
                        bodyData.put("pos", part);
                        bodyData.put("definition", definition);
                        bodyData.put("requestedWord", word);

                        room.setCurrWord(word);

                        for(Player player : room.getPlayers()) {
                            if(player.getName() == userName) {
                                player.setScore(((player.getScore() + 32 + (int) Math.random() * 7) * wordToReturn.length()) * 3);
                            }
                        }

                        room.setLimitTime(room.getLimitTime() - (expiredTime / 1000));
                        room.setRemainRoundTime(room.getLimitTime() * 200);

                        bodyData.put("currentRoomState", gson.toJson(room));

                        ret[0] = "correct";
                        ret[1] = bodyData.toJSONString();
                    }
                }

            } catch (ParseException e) {
                e.printStackTrace();
                ret[0] = "incorrect";
                ret[1] = "'" + word + "'";
            }
        }

        return ret;
    }

    public String onRoundEnd(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        Room room = this.gameRooms.get(roomId);
        for (Player player : room.getPlayers()) {
            if(player.getName().equals(userName)) {
                int score = (player.getScore() - 130 + (int) Math.random() * 33) * 2;
                if(score < 0) score = 0;
                player.setScore(score);
            }
        }

        room.setLimitTime(room.getOriginLimitTime());
        room.setRemainRoundTime(room.getOriginLimitTime() * 200);

        return gson.toJson(room);
    }

    public String onTurnProcess(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String userName = (String) requestedPayload.get("userName");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            this.togglePlayerTurnChangeReady(roomId, userName);
            Room room = this.gameRooms.get(roomId);

            if(this.checkAllPlayerTurnChangeReady(room.getPlayers())) {
                List<Player> players = room.getPlayers();
                boolean turnFlag = false;
                boolean isLastPlayer = true;
                String firstPlayerName = null;

                for (Player player : players) {
                    player.setTurnChangeReady(false);
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
            throw new NullPointerException("Error on onTurnProcess");
        }
    }

    public String onFail(Session _session, JSONObject _requestPacket) {
        JSONObject requestedPayload = (JSONObject) _requestPacket.get("payload");
        String roomId = Long.toString((long) requestedPayload.get("roomId"));

        try {
            Room room = this.gameRooms.get(roomId);

            if (room.getCurrRound() == room.getRounds()) 
                return "gameEnd";

            room.setCurrRound(room.getCurrRound() + 1);

            return "nextRound";
        } catch(Exception e) {
            e.getCause();
            e.printStackTrace();
            throw new NullPointerException("Error on onFail");
        }
    }

    private void togglePlayerReady(String _roomId, String _playerName) {
        Room room = this.gameRooms.get(_roomId);
        List<Player> gamers = room.getPlayers();

        for(Player player: gamers) {
            if(!player.getName().equals(_playerName)) continue;
            player.setGameReady(!player.isGameReady()); 
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

    private void togglePlayerRoundStartReady(String _roomId, String _playerName) {
        Room room = this.gameRooms.get(_roomId);
        List<Player> gamers = room.getPlayers();

        for(Player player: gamers) {
            if(!player.getName().equals(_playerName)) continue;
            player.setRoundStartReady(!player.isRoundStartReady()); 
            break;
        }

        room.setPlayers(gamers);
    }

    private void togglePlayerTurnChangeReady(String _roomId, String _playerName) {
        Room room = this.gameRooms.get(_roomId);
        List<Player> gamers = room.getPlayers();

        for(Player player: gamers) {
            if(!player.getName().equals(_playerName)) continue;
            player.setTurnChangeReady(!player.isTurnChangeReady()); 
            break;
        }

        room.setPlayers(gamers);
    }

    private boolean checkAllPlayerReady(List<Player> _players) {
        if(_players.size() <= 1) return false;
        for (Player player: _players) {
            if(!player.isGameReady())
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

    private boolean checkAllPlayerRoundStartReady(List<Player> _players) {
        if(_players.size() <= 1) throw new OutOfRangeException("Player size is invalid", null, null, false);
        for (Player player: _players) {
            if(!player.isRoundStartReady())
                return false;
        }
        return true;
    }

    private boolean checkAllPlayerTurnChangeReady(List<Player> _players) {
        if(_players.size() <= 1) throw new OutOfRangeException("Player size is invalid", null, null, false);
        for (Player player: _players) {
            if(!player.isTurnChangeReady())
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
