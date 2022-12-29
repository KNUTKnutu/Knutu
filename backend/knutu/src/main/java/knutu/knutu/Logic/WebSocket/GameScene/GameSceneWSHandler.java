package knutu.knutu.Logic.WebSocket.GameScene;

import java.lang.reflect.Method;
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
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.lib.classes.User.User;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ServerEndpoint(value="/ws/gamescene")
public class GameSceneWSHandler {
    
    private GameSceneInstances instances = GameSceneInstances.getInstance();
    private Set<Session> clients = instances.clients;
    private Map<String, User> onlineUsers = instances.onlineUsers;

    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        WebSocketController.getInstance().WSController(msg, session);
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
	public void onClose(Session session) {
        if(!this.clients.contains(session)) {
            log.info(String.format("already closed session: %s", session.getId()));
            return;
        }
        this.clients.remove(session);
        Method[] method = LobbySceneService.class.getMethods();
        for (Method _method : method) {
            System.out.println(_method);
        }
        LobbySceneService.getInstance().exitRoomByUserName(this.onlineUsers.get(session.getId()).getName());
        this.onlineUsers.remove(session.getId());
	}
    
    // private methods
}