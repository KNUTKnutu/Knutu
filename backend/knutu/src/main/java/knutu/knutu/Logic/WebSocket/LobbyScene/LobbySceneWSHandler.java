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

    @Scheduled(fixedDelay = 6000)
    public void onPollingTime() throws Exception {
        for(Session session : this.clients) {
            if(!this.serviceInstance.sendCurrentRooms(session)) log.info("error occured while broadcasting room infos");
            if(!this.serviceInstance.sendCurrentChannelInfo(session)) log.info("error occured while broadcasting users list on the room");
            /* if(){} // Heartbeat Logic Needed Here */
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
        
        try {
            LobbySceneService instance = LobbySceneService.getInstance();
            String userName = instance.userNameBySession.get(session.getId());
            if(!instance.onSessionClosed(userName)) {
                log.info("failed to logout on onClose method from LobbySceneWSHandler");
            }
        } catch (Exception e) {
            e.getCause();
        }
	}
}