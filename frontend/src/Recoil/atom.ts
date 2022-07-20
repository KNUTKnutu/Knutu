import { atom } from "recoil";
import { SCENE__INTROSCENE } from "../constant";

interface User {
  name: string;
  level: number;
  win_count: number;
}

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
});

export const userState = atom<User>({
  key: "userState",
  default: { name: "", level: 0, win_count: 0 },
});
