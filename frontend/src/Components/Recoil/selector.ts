import { selector } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import { currentSceneState } from "./atom";

export const sceneStatesState = selector({
  key: "sceneStates",
  get: ({ get }) => {
    const currentScene = get(currentSceneState);
    let result = { intro: false, lobby: false, game: false };
    switch (currentScene) {
      case SCENE__INTROSCENE:
        result = { ...result, intro: true };
        break;
      case SCENE__LOBBYSCENE:
        result = { ...result, lobby: true };
        break;
      case SCENE__GAMESCENE:
        result = { ...result, game: true };
        break;
    }
    return result;
  },
});
