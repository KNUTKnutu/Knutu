package knutu.knutu.Logic.WebSocket;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import knutu.knutu.Logic.WebSocket.GameScene.GameSceneService;
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;

import java.time.Instant;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.websocket.Session;

public class WebSocketController {

    public static WebSocketController Controller = new WebSocketController();
    public static WebSocketController getInstance() { return Controller; }

    private JSONParser jsonParser = new JSONParser();
    private JSONObject requestPacket;

    private LobbySceneService lobbySceneInstances = LobbySceneService.getInstance();
    private GameSceneService gameSceneInstances = GameSceneService.getInstance();

    public void WSController(String msg, Session session) throws Exception {
        requestPacket = (JSONObject) this.jsonParser.parse(msg);
        JSONObject requestHeader = (JSONObject) requestPacket.get("header");
        String headerType = requestHeader.get("type").toString();
    
        final Lock lock = new ReentrantLock();
        lock.lock();

        String type = "";
        String payload = "";
    
        switch(headerType) {
            case "onLobbyEntrance":
                type = "onLobbyEntrance";
                payload = this.lobbySceneInstances.onLobbyEntrance(session, requestPacket);
            case "requestRoomInfo":
                System.out.println("requested");
                type = "requestRoomInfo";
                payload = this.gameSceneInstances.onRequestRoomInfo(session, requestPacket);
            default:
                lock.unlock();
                this.setAndRespond(type, payload, session);
                break;
        }
    }

    private void setAndRespond(String type, String payload, Session session) throws Exception {
        String packet = "{\"header\": {\"type\": \"" + type + "\", \"timestamp\": \"" + Instant.now().toEpochMilli() + "\"}, \"payload\": {\"data\": " + payload + "}}";
        session.getBasicRemote().sendText(packet.toString());
    }

}