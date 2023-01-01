import { useState } from "react";
import { useRecoilValue } from "recoil";
import { enteredRoomState } from "../../../../../../../Recoil/atom";
import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import OnGamer from "./OnGamer";

const GamerList = () => {
  const room = useRecoilValue(enteredRoomState);
  const players = room.players;

  const playersMap = players.map(ele => <OnGamer key={ele.name} userinfo={ele} />)

  return (
    <div className={styles.gamer_list}>
      {playersMap}
    </div>
  );
};

export default GamerList;
