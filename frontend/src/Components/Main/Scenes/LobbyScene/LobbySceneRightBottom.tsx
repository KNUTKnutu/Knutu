import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import LobbyScene__Chatting from "./Components/LobbyScene__Chat/LobbyScene__Chatting";
import Navs from "./Components/Navs";

const LobbySceneRightBottom = (): JSX.Element => {
    return (
        <div className={styles.lobby_scene_right_bottom_container}>
            <LobbyScene__Chatting />
            <Navs />
        </div>
    );
  };
  
  export default LobbySceneRightBottom;
  