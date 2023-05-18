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
      // KnutuAudioHandler.getInstance().playOneShot() // 게임 시작 시 들릴 사운드
      setTimeout(() => {
        const payload = KnutuWebSocketHandler.getInstance().wrapPacket("readyToProcessRound", {
          roomId: gamingRoom.number,
          userName: user?.name
        });
        KnutuWebSocketHandler.getInstance().send("readyToProcessRound", payload);
      }, 2000);
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
