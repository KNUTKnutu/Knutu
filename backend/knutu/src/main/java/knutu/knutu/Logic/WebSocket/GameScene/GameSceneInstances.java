package knutu.knutu.Logic.WebSocket.GameScene;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.websocket.Session;

import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.User.User;

public class GameSceneInstances {
    public static GameSceneInstances GameSceneInstances = new GameSceneInstances();
    public static GameSceneInstances accessInstance() { return GameSceneInstances; }

    public Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());

    public Map<String, User> onlineUsers = new HashMap<String, User>();
    public Map<String, Room> gameRooms = new HashMap<String, Room>();

    public Map<String, String> userNameBySession = new HashMap<String, String>();
    public Map<String, Session> sessionByUserName = new HashMap<String, Session>();
    public Map<String, String> roomIdByUserName = new HashMap<String, String>();
}
