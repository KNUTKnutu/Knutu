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
    </footer>
  );
};

export default Footer;
