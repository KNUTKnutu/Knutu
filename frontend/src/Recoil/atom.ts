import { atom, useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../constant";
import { ChannelProps, Nullable, User, Users } from "../interface";
import KnutuWebSocketHandler from "../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import KnutuAudioHandler from "../Logic/Library/KnutuAudio/KnutuAudioHandler";
import localStorageEffect from "./effects/localStorageEffect";

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
  effects: [
    ({ onSet }) => {
      onSet((currScene, prevScene) => {
        let clip = KnutuAudioHandler.clipIntroScene;
        let targetScene = "IntroScene";
        switch (currScene) {
          case SCENE__INTROSCENE:
            break;
          case SCENE__LOBBYSCENE:
            clip = KnutuAudioHandler.clipLobbyScene
            targetScene = "LobbyScene";
            break;
          case SCENE__GAMESCENE:
            clip = KnutuAudioHandler.clipGameSceneWaiting;
            targetScene = "GameScene"
            break;
        }
        KnutuAudioHandler.getInstance().play(clip);
        KnutuWebSocketHandler.getInstance().setEnabledScene(targetScene);
      });
    },
  ],
});

export const readyState = atom({
  key: "readyState",
  default: false,
});

/**
 * 현재 사용자 정보를 담은 atom
 */
export const userState = atom<Nullable<User>>({
  key: "userState",
  default: null,
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
