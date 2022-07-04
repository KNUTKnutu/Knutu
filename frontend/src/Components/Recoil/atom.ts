import { atom } from "recoil";
import { SCENE__INTROSCENE } from "../../constant";

export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
});
