import { atom, useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../constant";
import { ChannelProps, Nullable, Room, User, Users } from "../interface";
import KnutuWebSocketHandler from "../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import KnutuAudioHandler from "../Logic/Library/KnutuAudio/KnutuAudioHandler";
import localStorageEffect from "./effects/localStorageEffect";
import { AudioClip } from "../Logic/Library/KnutuAudio/KnutuAudioTypes"
import { availableScenes } from "../Logic/Library/KnutuWebSocket/KnutuWebSocketTypes"

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
  effects: [
    ({ onSet }) => {
      onSet((currScene, prevScene) => {
        let clip: AudioClip = KnutuAudioHandler.clipIntroScene;
        let targetScene: availableScenes = "IntroScene";
        switch (currScene) {
          case SCENE__INTROSCENE:
            break;
          case SCENE__LOBBYSCENE:
            clip = KnutuAudioHandler.clipLobbyScene
            targetScene = "LobbyScene";
            break;
          case SCENE__GAMESCENE:
            clip = KnutuAudioHandler.clipGameSceneWaiting;
            targetScene = "GameScene";
            break;
        }
        KnutuAudioHandler.getInstance().play(clip);
        KnutuWebSocketHandler.getInstance().setEnabledScene(targetScene);
      });
    },
  ],
});
/**
 * 첫 마운트가 되었을 땐 투명도를 0으로 해주기 위함
 */
export const mountOpacity = atom({
  key: "opacityState",
  default: false
})

export const readyState = atom({
  key: "readyState",
  default: false,
});

/**
 * 현재 사용자 정보를 담은 atom
 */
export const userState = atom<Nullable<User>>({
  key: "userState",
  default: {},
  effects: [localStorageEffect("user")],
});

/**
 * LobbyScene에 유저 리스트를 보여줄 때 사용하는 atom
 */
export const usersState = atom<Users>({
  key: "usersState",
  default: [],
});

/**
 * 현재 존재하는 채널들의 정보를 담은 atom
 */
export const channelsState = atom<ChannelProps[]>({
  key: "channelsState",
  default: [],
  effects: [localStorageEffect("channels")],
});

export const soundState = atom({
  key: "soundState",
  default: false,
});

export const roomState = atom({
  key: "roomState",
  default: [],
});

export const roomsState = atom<Room[]>({
  key: "roomsState",
  default: [],
});

export const enteredRoomIdState = atom<number>({
  key: "enteredRoomIdState",
  default: 0,
});

export const enteredRoomState = atom({
  key: "enteredRoomState",
  default: {
    number: -1,
    title: "",
    lang: "",
    mode: "",
    rounds: -1,
    limitTime: -1,
    players: []
  }
  // { number, title, mode, rounds, limitTime, players }
});