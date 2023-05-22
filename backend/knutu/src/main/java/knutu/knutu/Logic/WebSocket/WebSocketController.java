package knutu.knutu.Logic.WebSocket;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import knutu.knutu.Logic.WebSocket.GameScene.GameSceneService;
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;

import java.time.Instant;
import java.util.Collection;
import java.util.LinkedList;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.websocket.Session;

public class WebSocketController {

    public static WebSocketController Controller = new WebSocketController();
    public static WebSocketController accessInstance() { return Controller; }

    private JSONParser jsonParser = new JSONParser();
    private JSONObject requestPacket;

    private LobbySceneService lobbySceneInstances = LobbySceneService.accessInstance();
    private GameSceneService gameSceneInstances = GameSceneService.accessInstance();

    public void WSController(String msg, Session session) throws Exception {
        requestPacket = (JSONObject) this.jsonParser.parse(msg);
        JSONObject requestHeader = (JSONObject) requestPacket.get("header");
        String headerType = requestHeader.get("type").toString();
    
        final Lock lock = new ReentrantLock();
        lock.lock();

        String type = "";
        String payload = "";

        // 자주 쓰일 변수는 선언해놓고 돌려쓰기
        Collection<Session> sessions = new LinkedList<Session>();
        String roomId;
    
        // TODO case별로 호출 메소드를 따로 파서 정리하기. 이대로는 switch문 내부가 너무 굵어져, 점점 복잡해짐.
        switch(headerType) {
            case "onLobbyEntrance":
                type = "onLobbyEntrance";
                payload = this.lobbySceneInstances.onLobbyEntrance(session, requestPacket);
                break;
            case "requestRoomInfo":
                type = "requestRoomInfo";
                payload = this.gameSceneInstances.onRequestRoomInfo(session, requestPacket);
                break;
            case "currentRooms":
                this.lobbySceneInstances.sendCurrentRooms(session);
                lock.unlock();
                return;
            case "submitSessionInfo":
                type = "submitSessionInfo";
                roomId = this.gameSceneInstances.getRoomIdSessionBelongs(session);
                sessions = this.gameSceneInstances.getSessionsInRoom(roomId);
                payload = this.gameSceneInstances.onSubmitSessionInfo(session, requestPacket);
                lock.unlock();
                this.setAndRespond(type, payload, sessions);
                return;
            case "requestExitRoom":
                type = "requestExitRoom";
                roomId = this.gameSceneInstances.getRoomIdSessionBelongs(session);
                sessions = this.gameSceneInstances.getSessionsInRoom(roomId);
                payload = this.gameSceneInstances.onRequestExitRoom(session, requestPacket);
                lock.unlock();
                this.setAndRespond(type, payload, sessions);
                return;
            case "requestToggleReady":
                type = "requestToggleReady";
                sessions = this.gameSceneInstances.onPlayerReady(session, requestPacket);
                payload = this.gameSceneInstances.onRequestToggleReady(session, requestPacket);
                lock.unlock();
                this.setAndRespond(type, payload, sessions);
                return;
            case "readyToProcessRound":
                type = "readyToProcessRound";
                roomId = this.gameSceneInstances.getRoomIdSessionBelongs(session);
                sessions = this.gameSceneInstances.getSessionsInRoom(roomId);
                payload = this.gameSceneInstances.onReadyToProcessRound(session, requestPacket);
                lock.unlock();
                if(payload != null) {
                    this.setAndRespond(type, payload, sessions);
                }
                return;
            case "readyToRoundStart":
                type = "readyToRoundStart";
                roomId = this.gameSceneInstances.getRoomIdSessionBelongs(session);
                sessions = this.gameSceneInstances.getSessionsInRoom(roomId);
                payload = this.gameSceneInstances.onReadyToRoundStart(session, requestPacket);
                lock.unlock();
                if(payload != null) {
                    this.setAndRespond(type, payload, sessions);
                }
                return;
            case "onTurnProcess":
                type = "onTurnProcess";
                roomId = this.gameSceneInstances.getRoomIdSessionBelongs(session);
                sessions = this.gameSceneInstances.getSessionsInRoom(roomId);
                payload = this.gameSceneInstances.onTurnProcess(session, requestPacket);
                lock.unlock();
                if(payload != null) {
                    this.setAndRespond(type, payload, sessions);
                }
                return;
            case "wordSubmit":
                type = "wordSubmit";
                sessions = this.gameSceneInstances.onPlayerReady(session, requestPacket);
                String[] result = this.gameSceneInstances.onWordSubmit(session, requestPacket);
                if(result[0].equals("incorrect")) {
                    type = "onWordIncorrect";
                } else {
                    type = "onWordCorrect";
                }
                lock.unlock();
                this.setAndRespond(type, result[1], sessions);
                return;
            case "onRoundEnd":
                type = "onRoundEnd";
                sessions = this.gameSceneInstances.onPlayerReady(session, requestPacket);
                payload = this.gameSceneInstances.onRoundEnd(session, requestPacket);
                lock.unlock();
                this.setAndRespond(type, payload, sessions);
                return;
            default:
                break;
        }
        lock.unlock();
        this.setAndRespond(type, payload, session);
    }

    private void setAndRespond(String type, String payload, Session session) throws Exception {
        String packet = "{\"header\": {\"type\": \"" + type + "\", \"timestamp\": \"" + Instant.now().toEpochMilli() + "\"}, \"payload\": {\"data\": " + payload + "}}";
        synchronized (session) {
            session.getBasicRemote().sendText(packet);
        }
    }

    private void setAndRespond(String type, String payload, Collection<Session> sessions) throws Exception {
        if(sessions != null) {
            for(Session session : sessions) {
                synchronized (session) {
                    this.setAndRespond(type, payload, session);
                }
            }
        }
    }
}