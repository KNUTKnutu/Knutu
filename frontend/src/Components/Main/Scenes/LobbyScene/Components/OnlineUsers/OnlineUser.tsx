import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { userInfoInterface } from "./Interface/userInfoInterface";
import { OnlineUserClass } from './Class/OnlineUser';

const OnlineUser = ({userInfo}: userInfoInterface): JSX.Element => {

    const getUserLevelString = OnlineUserClass.getUserLevelString(userInfo.level);

    return (
        <div className={styles.lobby_scene_onlineUser}>
            <span className={styles.onlineUser__name}>{userInfo.name}</span>
            <span className={styles.onlineUser__level}>{getUserLevelString}</span>
        </div>
    );
}

export default OnlineUser;