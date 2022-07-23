package knutu.knutu.Logic;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@ServerEndpoint(value="/ws")
public class WebSocketHandler {

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        log.info("---------------------------");
        log.info("onMessage");
        log.info(msg);
        log.info(session.toString());
        log.info(clients.toString());
        log.info("---------------------------");
    }
	
	@OnOpen
	public void onOpen(Session session) {
        log.info("---------------------------");
        log.info("onOpen");
        log.info(session.toString());
        log.info(clients.toString());
        log.info("---------------------------");
	}
	
	@OnClose
	public void onClose(Session session) {
        log.info("---------------------------");
        log.info("onClose");
        log.info(session.toString());
        log.info(clients.toString());
        log.info("---------------------------");
	}
    
}