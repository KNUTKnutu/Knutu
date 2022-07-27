import { atom } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../constant";
import { Nullish, TestingUser } from "../interface";
import storageEffect from "./effects/storage";

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
  effects: [
    ({ onSet }) => {
      onSet((currScene, prevScene) => {
        let ws: WebSocket;

        switch (currScene) {
          case SCENE__INTROSCENE:
            break;
          case SCENE__LOBBYSCENE:
            ws = new WebSocket(`ws://localhost:19410/ws/lobbyscene`);

            ws.onmessage = (msg) => {
              console.log(msg);
              console.log(JSON.parse(msg.data));
              console.log("message above is from lobbyscene");
            };

            let _packet = {
              header: {
                type: "onLobbyEntrance",
                date: new Date().getTime(),
              },
              payload: {
                msg: "onLobbyEntrance shit",
                user: {
                  name: "신이종" + Math.floor(Math.random() * Math.pow(2, 32)),
                },
              },
            };

            let packet = JSON.stringify(_packet);

            setTimeout(() => ws.send(packet), 1000);
            break;
          case SCENE__GAMESCENE:
            ws = new WebSocket(`ws://localhost:19410/ws/gamescene`);
            break;
        }
      });
    },
  ],
});

export const userState = atom<Nullish<TestingUser>>({
  key: "userState",
  default: null,
  effects: [storageEffect("user")],
});
