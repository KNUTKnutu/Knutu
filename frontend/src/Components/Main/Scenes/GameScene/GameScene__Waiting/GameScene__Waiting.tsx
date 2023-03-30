import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { SCENE__GAMESCENE } from "../../../../../constant";
import KnutuAudioHandler from "../../../../../Logic/Library/KnutuAudio/KnutuAudioHandler";
import { currentSceneState } from "../../../../../Recoil/atom";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameWatingLeft from "./GameWatingLeft";
import GameWatingRight from "./GameWatingRight";

const GameScene__Waiting = ({ _isGaming }: any): JSX.Element => {

  const currentScene = useRecoilValue(currentSceneState);

  useEffect(() => {
    if(currentScene == SCENE__GAMESCENE) {
      const clip = KnutuAudioHandler.clipGameSceneWaiting;
      if(!_isGaming) {
        KnutuAudioHandler.audio.play(clip);
      }
      else if(KnutuAudioHandler.audio.getCurrentAudioClip() == clip) {
        KnutuAudioHandler.audio.stop();
      }
    }
  }, [currentScene, _isGaming]);

  return (
    <div
      className={`${styles.game_scene__waiting_container} ${
        _isGaming ? styles.true : styles.false
      }`}
    >
      <GameWatingLeft />
      <GameWatingRight />
    </div>
  );
};

export default GameScene__Waiting;
