import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import Rooms from "./Components/Rooms/Rooms";

const LobbySceneRightTop = (): JSX.Element => {
    return (
        <div className={styles.lobby_scene_right_top_container}>
            <Rooms />
        </div>
    );
  };
  
  export default LobbySceneRightTop;
  