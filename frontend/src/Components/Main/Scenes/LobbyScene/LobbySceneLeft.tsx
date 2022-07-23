import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import MyInfos from "./Components/MyInfos";
import OnlineUsers from "./Components/OnlineUsers/OnlineUsers";

const LobbySceneLeft = (): JSX.Element => {
    return (
        <div className={styles.lobby_scene_left_container}>
            <OnlineUsers />
            <MyInfos />
        </div>
    );
  };
  
  export default LobbySceneLeft;
  