import { atom } from "recoil";
import { SCENE__GAMESCENE, SCENE__INTROSCENE, SCENE__LOBBYSCENE } from "../constant";

interface User {
  name: string;
  level: number;
  win_count: number;
}

// 어떤 Scene을 보여줄 지
export const currentSceneState = atom<string>({
  key: "currentSceneState",
  default: SCENE__INTROSCENE,
  effects: [
    ({onSet}) => {
      onSet((currScene, prevScene) => {

        let ws: WebSocket;

        switch(currScene) {
            case SCENE__INTROSCENE:
                break;
            case SCENE__LOBBYSCENE:
                ws = new WebSocket(`ws://localhost:19410/ws/lobbyscene`);

                ws.onmessage = (msg) => {
                    console.log(msg);
                    console.log(JSON.parse(msg.data));
                    console.log("message above is from lobbyscene");
                }

                let _packet = {
                    header: {
                        type: "onLobbyEntrance",
                        date: new Date().toLocaleString()
                    },
                    payload: {
                        msg: "onLobbyEntrance shit",
                        user: {
                            name: "신이종" + Math.floor(Math.random() * Math.pow(2, 32))
                        }
                    }
                }

                let packet = JSON.stringify(_packet);

                setTimeout(() => ws.send(packet), 1000);
                break;
            case SCENE__GAMESCENE:
                ws = new WebSocket(`ws://localhost:19410/ws/gamescene`);
                break;
        }
      })
    }
  ]
});

export const userState = atom<User>({
  key: "userState",
  default: { name: "", level: 0, win_count: 0 },
});
