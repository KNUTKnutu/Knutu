import { useRecoilValue } from "recoil";
import { User, Users } from "../../../../../../interface";
import { usersState, userState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { OnlineUserClass } from "./Class/OnlineUser";
import OnlineUser from "./OnlineUser";

const OnlineUsers = (): JSX.Element => {

    const usersRecoilState = useRecoilValue<Users>(usersState);

    const onlineUserList = usersRecoilState.map(user => {
        return (
            <OnlineUser key={user.name} userInfo={user} />
        )
    });

    const userCountString = OnlineUserClass.getUserCountString(usersRecoilState.length);

    return (
        <div className={`${styles.lobby_scene_onlineUsersContainer} ${styles.lobby_scene_components}`}>
            <div className={styles.lobby_scene_onlineUsers}>
                {onlineUserList}
            </div>
            <div className={styles.lobby_scene_onlineCount}>
                {userCountString}
            </div>
        </div>
    );
  };
  
  export default OnlineUsers;
  