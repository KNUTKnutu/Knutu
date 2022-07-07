import { atom } from "recoil";
import { SCENE__INTROSCENE } from "../../constant";

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
});
