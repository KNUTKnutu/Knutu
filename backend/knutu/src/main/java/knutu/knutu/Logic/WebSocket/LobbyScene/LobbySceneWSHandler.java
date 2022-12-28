package knutu.knutu.Logic.WebSocket.LobbyScene;

import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import knutu.knutu.Logic.WebSocket.WebSocketController;
import knutu.knutu.Service.lib.classes.User.User;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ServerEndpoint(value="/ws/lobbyscene")
public class LobbySceneWSHandler {

    private LobbySceneService serviceInstance = LobbySceneService.getInstance();
    private LobbySceneInstances instances = LobbySceneInstances.getInstance();
    private Set<Session> clients = instances.clients;
    private Map<String, User> onlineUsers = instances.onlineUsers;

    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        WebSocketController.getInstance().WSController(msg, session);
    }

    @Scheduled(fixedDelay = 10000)
    public void onPollingTime() throws Exception {
        for(Session session : this.clients) {
            if(!this.serviceInstance.sendCurrentRooms(session)) log.info("error occured while broadcasting room infos");
        }
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
}