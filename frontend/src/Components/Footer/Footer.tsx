import { send } from "process";
import { useState } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  SCENE__INTROSCENE,
  SCENE__LOBBYSCENE,
} from "../../constant";
import KnutuAudioHandler from "../../Logic/Library/KnutuAudio/KnutuAudioHandler";
import { currentSceneState, soundState } from "../../Recoil/atom";
import styles from "../../styles/Components/Footer/_footer.module.scss";

const Footer = (): JSX.Element => {
  const setCurrentScene = useSetRecoilState(currentSceneState);
  const [mute, setMute] = useRecoilState(soundState);
  const [vol, setVol] = useState(0);
  
  const onClickSceneBtn = (e: any) => {
    const { target } = e;
    if (target.tagName === "BUTTON") {
      const { innerHTML } = target;
      setCurrentScene(innerHTML);
    }
  };

  const onClickWebSocketTest = () => {
    const _packet = {
      header: {
        type: "tester",
        date: new Date().toLocaleString(),
      },
      payload: {
        msg: "testing",
      },
    };

    const packet = JSON.stringify(_packet);
  };

  const audioInstance = KnutuAudioHandler.getInstance();
  

  const onClickAudioTest__PlayOneShot = () => {
    audioInstance.setVolume(1);
    audioInstance.playOneShot(KnutuAudioHandler.clipSuspense);
  };

  const onClickAudioTest__Play = () => {
    audioInstance.setVolume(0.5);
    audioInstance.play(KnutuAudioHandler.clipIntroScene);
  };

  const onClickAudioTest__Pause = () => {
    if (audioInstance.isPlaying()) return audioInstance.pause();
    audioInstance.unPause();
  };

  const onClickAudioTest__Stop = () => {
    audioInstance.stop();
  };

  const onClickAudioTest__Loop = () => {
    audioInstance.setLoop();
  };

  const onClickAudioTest__Unloop = () => {
    audioInstance.setUnloop();
  };

  // 효과음은 mute가 안되고 있음, 어디를 건드려야하는 거지
  const onClickAudioTest__Mute = () => {
    setVol(audioInstance.getVolume());
    if (!mute) {
      console.log(`current volume is ${vol}`);
      audioInstance.setVolume(0);
      setMute(!mute);
    } else {
      console.log(`current volume is ${vol}`);
      audioInstance.setVolume(vol);
      setMute(!mute);
    }
  };
  return (
    <footer onClick={onClickSceneBtn} className={styles.footer_container}>
      <div>
        <button>{SCENE__INTROSCENE}</button>
        <button>{SCENE__LOBBYSCENE}</button>
        <button>{SCENE__GAMESCENE}</button>
      </div>
      <span>Copyright</span>
      <button onClick={onClickWebSocketTest}>websocket test</button>
      <button onClick={onClickAudioTest__PlayOneShot}>
        audio test - playOneShot
      </button>
      <button onClick={onClickAudioTest__Play}>audio test - play</button>
      <button onClick={onClickAudioTest__Pause}>
        audio test - pause / unpause
      </button>
      <button onClick={onClickAudioTest__Stop}>audio test - stop</button>
      <button onClick={onClickAudioTest__Loop}>audio test - loop</button>
      <button onClick={onClickAudioTest__Unloop}>audio test - unloop</button>
      <button onClick={onClickAudioTest__Mute}>audio test - mute</button>
    </footer>
  );
};

export default Footer;
