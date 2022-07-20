import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { currentSceneState } from "../../../../Recoil/atom";
import { SCENE__LOBBYSCENE } from "../../../../constant";
import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";

const LobbyScene = (): JSX.Element => {
  return (
    <div className={styles.lobby_scene_container}>{SCENE__LOBBYSCENE}</div>
  );
};

export default LobbyScene;
