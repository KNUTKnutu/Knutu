package knutu.knutu.Logic.WebSocket.GameScene;

import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.stereotype.Component;

import knutu.knutu.Logic.WebSocket.WebSocketController;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ServerEndpoint(value="/ws/gamescene")
public class GameSceneWSHandler {
    
    private GameSceneInstances instances = GameSceneInstances.getInstance();
    private Set<Session> clients = instances.clients;
    private Map<String, String> onlineUsers = instances.onlineUsers;

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
        this.clients.add(session);
	}
	
	@OnClose
	public void onClose(Session session) {
        if(!this.clients.contains(session)) {
            log.info(String.format("already closed session: %s", session.getId()));
            return;
        }
        this.clients.remove(session);
        this.onlineUsers.remove(session.getId());
	}
    
    // private methods
}