package knutu.knutu.Logic.WebSocket.LobbyScene;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@EnableAsync
@ServerEndpoint(value="/ws/lobbyscene")
public class LobbySceneWSHandler {

    private JSONParser jsonParser = new JSONParser();
    private JSONObject requestPacket;

    private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

    private Map<String, String> onlineUsers = new HashMap<String, String>();

    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        log.info(msg);
        requestPacket = (JSONObject) jsonParser.parse(msg);
        JSONObject header = (JSONObject) requestPacket.get("header");
        String headerType = header.get("type").toString();
        log.info(headerType);
        log.info(session.getBasicRemote().toString());
        log.info("---------------------------");

        String responsePacket = "";

        final Lock lock = new ReentrantLock();

        lock.lock();

        switch(headerType) {
            case "onLobbyEntrance":
            responsePacket = this.onLobbyEntrance(session, requestPacket);
            default:
                lock.unlock();
                session.getBasicRemote().sendText(responsePacket);
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
    private String onLobbyEntrance(Session _session, JSONObject _requestPacket) {
        JSONObject requestPayload = (JSONObject) _requestPacket.get("payload");
        JSONObject user = (JSONObject) requestPayload.get("user");
        String name = user.get("name").toString();
        onlineUsers.put(_session.getId(), name);
        
        JSONObject responseHeader = new JSONObject();
        responseHeader.put("type", "onLobbyEntrance");
        responseHeader.put("date", LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS")));

        JSONObject responsePayload = new JSONObject();
        responsePayload.put("users", onlineUsers.values().toString());

        JSONObject responsePacket = new JSONObject();
        responsePacket.put("header", responseHeader);
        responsePacket.put("payload", responsePayload);

        return responsePacket.toString();
    }
}