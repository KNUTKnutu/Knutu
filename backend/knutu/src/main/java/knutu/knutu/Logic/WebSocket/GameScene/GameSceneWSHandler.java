package knutu.knutu.Logic.WebSocket.GameScene;

import java.time.Instant;
import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import knutu.knutu.Logic.Library.JSONBeautifier;
import knutu.knutu.Logic.WebSocket.WebSocketController;
import knutu.knutu.Service.lib.classes.User.User;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ServerEndpoint(value="/ws/gamescene")
public class GameSceneWSHandler {
    
    private GameSceneInstances instances = GameSceneInstances.accessInstance();
    private Set<Session> clients = instances.clients;
    private Map<String, User> onlineUsers = instances.onlineUsers;

    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        WebSocketController.accessInstance().WSController(msg, session);
    }
	
	@OnOpen
	public void onOpen(Session session) {
        if(this.clients.contains(session)) {
            log.info(String.format("duplicated session id tried to connect through websocket: %s", session.getId()));
            return;
        }

        try {
            Gson gson = new GsonBuilder().create();
            String finalizedJSON = JSONBeautifier.finalizeJSON("onGameWaitingEntrance", gson.toJson(""));
            session.getBasicRemote().sendText(finalizedJSON);
        } catch(Exception e) {}

        this.clients.add(session);
	}
	
	@OnClose
	public void onClose(Session session) throws Exception {
        if(!this.clients.contains(session)) {
            log.info(String.format("already closed session: %s", session.getId()));
            return;
        }
        this.clients.remove(session);
        this.onlineUsers.remove(session.getId());
        this.exitRoomOnSocketClose(session);
	}
    
    // private methods
    private void exitRoomOnSocketClose(Session session) throws Exception {
        GameSceneService gameSceneServiceInstance = GameSceneService.accessInstance();

        String userName = gameSceneServiceInstance.userNameBySession.get(session.getId());
        String roomId = gameSceneServiceInstance.getRoomIdUserNameBelongs(userName);
        
        String msg = "{\"header\":{\"type\":\"requestExitRoom\",\"date\":" + Instant.now().toEpochMilli() + "},\"payload\":{\"roomId\":" + roomId + ",\"userName\":\"" + userName + "\"}}";
        WebSocketController.accessInstance().WSController(msg, session);
    }
}