import { Nullable } from "../CommonTypes/CommonTypes";

export type availableScenes = "IntroScene" | "LobbyScene" | "GameScene";

export interface WSURLsInterface {
    lobbyScene: string,
    gameScene: string,
}

export const WSURLs: WSURLsInterface = {
    lobbyScene: "ws://localhost:19410/ws/lobbyscene",
    gameScene: "ws://localhost:19410/ws/gamescene"
}

export interface WebSocketPacket {
    header: {
        type?: Nullable<string>,
        date: number,
    }
    payload: Record<never, never>
}