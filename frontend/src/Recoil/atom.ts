import { atom, useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../constant";
import { Nullish, User } from "../interface";
import storageEffect from "./effects/storage";
import KnutuWebSocketHandler from '../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
  effects: [
    ({ onSet }) => {
      onSet((currScene, prevScene) => {
        switch (currScene) {
          case SCENE__INTROSCENE:
            KnutuWebSocketHandler.getInstance().setEnabledScene("IntroScene");
            break;
          case SCENE__LOBBYSCENE:
            KnutuWebSocketHandler.getInstance().setEnabledScene("LobbyScene");
            break;
          case SCENE__GAMESCENE:
            KnutuWebSocketHandler.getInstance().setEnabledScene("GameScene");
            break;
        }
      });
    },
  ],
});

export const userState = atom<Nullish<User>>({
  key: "userState",
  default: null,
  effects: [storageEffect("user")],
});
