import { atom, useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../constant";
import { Nullish, User } from "../interface";
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
            
            const setUserState = useSetRecoilState<Nullish<User>>(userState);

            ws.onmessage = (msg) => {
              console.log(msg);
              const data = JSON.parse(JSON.parse(msg.data).payload.data);
              console.log(data);
              setUserState(data);
              console.log("message above is from lobbyscene");
            };

            const type = "onLobbyEntrance";
            const date = new Date().getTime();

            let _packet = {
              header: {
                type,
                date,
              },
              payload: {
                user: {
                  name: "shinleejong",
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

export const userState = atom<Nullish<User>>({
  key: "userState",
  default: null,
  effects: [storageEffect("user")],
});
