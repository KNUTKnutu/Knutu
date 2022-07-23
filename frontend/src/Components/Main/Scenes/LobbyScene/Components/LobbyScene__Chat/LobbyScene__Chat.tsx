import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { LobbyScene__ChatInterface } from "./Interface/LobbyScene__ChatInterface";

const LobbyScene__Chat = ({chatInfo}: LobbyScene__ChatInterface): JSX.Element => {
    return (
        <div className={styles.lobby_scene_chatting__chat}>
            <span className={styles.lobby_scene_chatting__chatter}>
                {chatInfo.chatter}
            </span>
            <span className={styles.lobby_scene_chatting__chatMessage}>
                {chatInfo.chatMessage}
            </span>
            <span className={styles.lobby_scene_chatting__chatTime}>
                {chatInfo.chatTime.toString()}
            </span>
        </div>
    );
}

export default LobbyScene__Chat;