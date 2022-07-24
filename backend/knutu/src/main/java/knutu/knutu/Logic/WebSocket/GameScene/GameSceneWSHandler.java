package knutu.knutu.Logic.WebSocket.GameScene;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ServerEndpoint(value="/ws/gamescene")
public class GameSceneWSHandler {

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
    private JSONParser jsonParser = new JSONParser();
    private JSONObject packet;

    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        log.info(msg);
        packet = (JSONObject) jsonParser.parse(msg);
        JSONObject header = (JSONObject) packet.get("header");
        String headerType = header.get("type").toString();
        log.info(headerType);
        log.info(session.getBasicRemote().toString());
        log.info("---------------------------");

        switch(headerType) {
            case "":

        }
    }
	
	@OnOpen
	public void onOpen(Session session) {
        if(clients.contains(session)) {
            log.info("duplicated session id tried to connect through websocket");
            return;
        }
        clients.add(session);
        log.info("---------------------------");
        log.info("onOpen");
        log.info(session.getId());
        log.info("---------------------------");
	}
	
	@OnClose
	public void onClose(Session session) {
        if(!clients.contains(session)) {
            log.info("already closed session");
            return;
        }
        clients.remove(session);
        log.info("---------------------------");
        log.info("onClose");
        log.info("---------------------------");
	}
    
    // private methods
}