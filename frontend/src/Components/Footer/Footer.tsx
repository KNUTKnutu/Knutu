import { send } from "process";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import KnutuAudioHandler from '../../Logic/Library/KnutuAudioHandler';
import { currentSceneState } from "../../Recoil/atom";
import styles from "../../styles/Components/Footer/_footer.module.scss";

const Footer = (): JSX.Element => {

  const wsURL = `ws://localhost:19410/ws/lobbyscene`;

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
    // const _packet = {
    //   header: {
    //     type: "tester",
    //     date: new Date().toLocaleString()
    //   },
    //   payload: {
    //     msg: "testing",
    //   }
    // };

    // const packet = JSON.stringify(_packet);

    // ws.send(packet);
  }

  const audioInstance = KnutuAudioHandler.getInstance();

  const onClickAudioTest__PlayOneShot = () => {
    audioInstance.playOneShot(KnutuAudioHandler.clipSuspense);
  }

  const onClickAudioTest__Play = () => {
    audioInstance.setVolume(0.1);
    audioInstance.play(KnutuAudioHandler.clipIntroScene);
  }

  const onClickAudioTest__Pause = () => {
    if(audioInstance.isPlaying()) return audioInstance.pause();
    audioInstance.Unpause();
  }

  const onClickAudioTest__Stop = () => {
    audioInstance.stop();
  }

  const onClickAudioTest__Loop = () => {
    audioInstance.setLoop();
  }

  const onClickAudioTest__Unloop = () => {
    audioInstance.setUnloop();
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
      <button onClick={onClickAudioTest__PlayOneShot}>audio test - playOneShot</button>
      <button onClick={onClickAudioTest__Play}>audio test - play</button>
      <button onClick={onClickAudioTest__Pause}>audio test - pause / unpause</button>
      <button onClick={onClickAudioTest__Stop}>audio test - stop</button>
      <button onClick={onClickAudioTest__Loop}>audio test - loop</button>
      <button onClick={onClickAudioTest__Unloop}>audio test - unloop</button>
    </footer>
  );
};

export default Footer;
