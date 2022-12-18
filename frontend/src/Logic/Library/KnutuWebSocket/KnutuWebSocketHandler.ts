import { availableScenes, WebSocketPacket, WSURLs } from './KnutuWebSocketTypes';
import { Nullable } from '../CommonTypes/CommonTypes';
import KnutuAudioHandler from '../KnutuAudio/KnutuAudioHandler';

/**
* Knutu Library - KnutuWebSocketHandler
*/
class KnutuWebSocketHandler {

    public static webSocketHandler: KnutuWebSocketHandler = new KnutuWebSocketHandler();
    public static getInstance = (): KnutuWebSocketHandler => this.webSocketHandler;

    public static enabledScene: availableScenes = "IntroScene";
    public static onMessageReceiver: (msg: string) => void;

    private webSocket__lobby: Nullable<WebSocket> = null;
    private webSocket__game: Nullable<WebSocket> = null;

    private onMessageHandler = (msg: any) => {
        KnutuWebSocketHandler.onMessageReceiver(msg);
    } 

    public setEnabledScene = (_scene: availableScenes) => {
        KnutuWebSocketHandler.enabledScene = _scene;
        this.onSceneChanged();
    }

    public getEnabledScene = (): availableScenes => KnutuWebSocketHandler.enabledScene;

    /** 
     * Send a message to server via WebSocket. Error will be returned if Websocket is not connected yet or you're on IntroScene.
     * @param1 message to send.
     * @param2 packet to send.
     * @returns void.
     * */
    public send = (message: string, _packet: WebSocketPacket): void => {

        const shootError = () => console.error("WebSocket is not connected yet.");
        if (this.getEnabledScene() === "IntroScene") return shootError();

        if(_packet.header.type == null && message != null) {
            _packet.header.type = message;
        }

        const stringifiedJSON: string = JSON.stringify(_packet);
        const enabledWebSocket: Nullable<WebSocket> = this.getEnabledScene() === "LobbyScene" ? this.webSocket__lobby : this.webSocket__game

        if(enabledWebSocket === null) 
            return shootError();
        
        console.log(stringifiedJSON);
        
        enabledWebSocket!.send(stringifiedJSON);
    };

    // Private Methods Below
    private onSceneChanged = (): void => {
        this.webSocketCloser();

        switch(KnutuWebSocketHandler.enabledScene) {
            case "IntroScene":
                break;
            case "LobbyScene":
                this.webSocket__lobby = new WebSocket(WSURLs.lobbyScene);
                this.webSocket__lobby!.onopen = () => this.onSceneEntrance();
                break;
            case "GameScene":
                this.webSocket__game = new WebSocket(WSURLs.gameScene);
                this.webSocket__game!.onopen = () => this.onSceneEntrance();
                break;
        }

        this.attachListenerToWebSocket();
    }

    private webSocketCloser = (): void => {
        switch(KnutuWebSocketHandler.enabledScene) {
            case "IntroScene":
                if(this.webSocket__lobby != null) {
                    this.webSocket__lobby.close();
                    this.webSocket__lobby = null;
                }
                if(this.webSocket__game != null) {
                    this.webSocket__game.close();
                    this.webSocket__game = null;
                }
                break;
            case "LobbyScene":
                if(this.webSocket__game != null) {
                    this.webSocket__game.close();
                    this.webSocket__game = null;
                }
                break;
            case "GameScene":
                if(this.webSocket__lobby != null) {
                    this.webSocket__lobby.close();
                    this.webSocket__lobby = null;
                }
                break;
        }
    }

    private attachListenerToWebSocket = (): void => {
        switch(KnutuWebSocketHandler.enabledScene) {
            case "IntroScene":
                return;
            case "LobbyScene":
                this.webSocket__lobby!.onmessage = this.onMessageHandler;
                return;
            case "GameScene":
                this.webSocket__game!.onmessage = this.onMessageHandler;
                return;
        }
    };

    private onSceneEntrance = (): void => {
        switch(KnutuWebSocketHandler.enabledScene) {
            case "IntroScene":
                return;
            case "LobbyScene":
                return;
            case "GameScene":
                return;
        }
    }
}

export default KnutuWebSocketHandler;