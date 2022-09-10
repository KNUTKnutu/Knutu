import { atom, useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../constant";
import { ChannelProps, Nullable, User, Users } from "../interface";
import storageEffect from "./effects/storage";
import KnutuWebSocketHandler from "../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler";
import KnutuAudioHandler from "../Logic/Library/KnutuAudio/KnutuAudioHandler";

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
  effects: [
    ({ onSet }) => {
      onSet((currScene, prevScene) => {
        switch (currScene) {
          case SCENE__INTROSCENE:
            KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipIntroScene);
            KnutuWebSocketHandler.getInstance().setEnabledScene("IntroScene");
            break;
          case SCENE__LOBBYSCENE:
            KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipLobbyScene);
            KnutuWebSocketHandler.getInstance().setEnabledScene("LobbyScene");
            break;
          case SCENE__GAMESCENE:
            KnutuAudioHandler.getInstance().play(KnutuAudioHandler.clipGameSceneWaiting);
            // 아마도 GameSceneWaiting, GameScenePlaying 마다 브금 바꾸는 작업은 여기서 이루어져야 할 듯.
            KnutuWebSocketHandler.getInstance().setEnabledScene("GameScene");
            break;
        }
      });
    },
  ],
});

// export const userState = atom<Nullable<User>>({
//   key: "userState",
//   default: null,
//   effects: [storageEffect("user")],
// });

export const readyState = atom({
  key: "readyState",
  default: false,
});

export const userState = atom<User>({
  key: "userState",
  default: {},
  effects: [storageEffect("user")],
});

export const usersState = atom<Users>({
  key: "usersState",
  default: [],
});

export const channelsState = atom<ChannelProps[]>({
  key: "channelsState",
  default: [],
});