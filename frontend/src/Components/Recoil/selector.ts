import { selector } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import { currentSceneState } from "./atom";

interface IsSceneStatesProps {
  isActiveIntro: boolean;
  isActiveLobby: boolean;
  isActiveGame: boolean;
}

export const isSceneStates = selector<IsSceneStatesProps>({
  key: "isSceneStates",
  get: ({ get }) => {
    const currentScene = get(currentSceneState);
    let result = {
      isActiveIntro: false,
      isActiveLobby: false,
      isActiveGame: false,
    };
    switch (currentScene) {
      case SCENE__INTROSCENE:
        result = { ...result, isActiveIntro: true };
        break;
      case SCENE__LOBBYSCENE:
        result = { ...result, isActiveLobby: true };
        break;
      case SCENE__GAMESCENE:
        result = { ...result, isActiveGame: true };
        break;
    }
    return result;
  },
});
