import { useState, useEffect } from "react";
import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";
import GameGammingLeft from "./GameGammingLeft";
import GameGammingRight from "./GameGammingRight";
import { isGameInProgress, fallState, enteredRoomState, userState } from './../../../../../Recoil/atom';
import KnutuAudioHandler from './../../../../../Logic/Library/KnutuAudio/KnutuAudioHandler';
import { useRecoilValue } from 'recoil';
import KnutuWebSocketHandler from './../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

const GameScene__Gaming = ({ _isGaming }: any): JSX.Element => {

  const user = useRecoilValue(userState);
  const gamingRoom = useRecoilValue(enteredRoomState);
  const isGaming = useRecoilValue(isGameInProgress);
  const isFalling = useRecoilValue(fallState);
  
  useEffect(() => {
    if(isGaming && !isFalling) {
      const audio = KnutuAudioHandler.getInstance();
      audio.stop(); // 기존 브금 중단
      audio.play(KnutuAudioHandler.clipOnGameStart);  // GameScene Waiting => GameScene Gaming 넘어가면서 나올 노래
      setTimeout(() => {
        const payload = KnutuWebSocketHandler.getInstance().wrapPacket("readyToProcessRound", {
          roomId: gamingRoom.number,
          userName: user?.name
        });
        KnutuWebSocketHandler.getInstance().send("readyToProcessRound", payload);
      }, 4000);
    }
  }, [isGaming, isFalling]);

  return (
    <div
      className={`${styles.game_scene__gaming_container} ${
        _isGaming ? styles.true : styles.false
      }`}
    >
      <GameGammingLeft />
      <GameGammingRight />
    </div>
  );
};

export default GameScene__Gaming;
