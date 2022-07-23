import { send } from "process";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import { currentSceneState } from "../../Recoil/atom";
import styles from "../../styles/Components/Footer/_footer.module.scss";

const Footer = () => {

  const wsURL = `ws://localhost:19410/ws`;

  const ws = new WebSocket(wsURL);

  const [data, setData] = useState({});

  ws.onmessage = (msg) => {
    setData(JSON.parse(msg.data));
    console.log(data);
  }
  
  const setCurrentScene = useSetRecoilState(currentSceneState);

  const onClickSceneBtn = (e: any) => {
    const { target } = e;
    if (target.tagName === "BUTTON") {
      const { innerHTML } = target;
      setCurrentScene(innerHTML);
    }
  };

  const onClickWebSocketTest = () => {
    const _packet = {
      msg: "testing",
      date: new Date().toLocaleString()
    };

    const packet = JSON.stringify(_packet);

    ws.send(packet);
  }

  return (
    <footer onClick={onClickSceneBtn} className={styles.footer_container}>
      <div>
        <button>{SCENE__INTROSCENE}</button>
        <button>{SCENE__LOBBYSCENE}</button>
        <button>{SCENE__GAMESCENE}</button>
      </div>
      <span>Copyright</span>
      <button onClick={onClickWebSocketTest}>websocket test</button>
    </footer>
  );
};

export default Footer;
