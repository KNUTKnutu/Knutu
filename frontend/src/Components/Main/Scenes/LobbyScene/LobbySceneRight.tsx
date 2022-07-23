import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import LobbySceneRightBottom from "./LobbySceneRightBottom";
import LobbySceneRightTop from "./LobbySceneRightTop";

const LobbySceneRight = (): JSX.Element => {
    return (
        <div className={styles.lobby_scene_right_container}>
            <LobbySceneRightTop />
            <LobbySceneRightBottom />
        </div>
    );
  };
  
  export default LobbySceneRight;
  