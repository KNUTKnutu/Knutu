package knutu.knutu.Logic.WebSocket.GameScene;

import java.util.Collection;
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
    public static GameSceneInstances getInstance() { return GameSceneInstances; }

    public Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
    public Map<String, User> onlineUsers = new HashMap<String, User>();
    public Map<String, Room> gameRooms = new HashMap<String, Room>();
    public Map<String, Collection<Session>> sessionsInRoom = new HashMap<String, Collection<Session>>();
    public Map<String, String> userLocationMapWithName = new HashMap<String, String>();
    public Map<String, String> userLocationMapWithSessionID = new HashMap<String, String>();
}
