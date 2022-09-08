package knutu.knutu.Logic.WebSocket.LobbyScene;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.websocket.Session;

import knutu.knutu.Service.lib.classes.Channel.Channel;
import knutu.knutu.Service.lib.classes.GameRoom.Room;
import knutu.knutu.Service.lib.classes.User.User;

public class LobbySceneInstances {
    public static LobbySceneInstances LobbySceneInstances = new LobbySceneInstances();
    public static LobbySceneInstances getInstance() { return LobbySceneInstances; }

    public Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
    public Map<String, User> onlineUsers = new HashMap<String, User>();
    public Map<String, Room> gameRooms = new HashMap<String, Room>();
    public Map<String, Channel> availableChannels = new HashMap<String, Channel>();
}
