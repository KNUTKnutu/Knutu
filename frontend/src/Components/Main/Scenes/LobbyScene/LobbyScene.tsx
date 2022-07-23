import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import LobbySceneLeft from "./LobbySceneLeft";
import LobbySceneRight from "./LobbySceneRight";

const LobbyScene = (): JSX.Element => {
  return (
    <div className={styles.lobby_scene_container}>
      <LobbySceneLeft />
      <LobbySceneRight />
    </div>
  );
};

export default LobbyScene;
