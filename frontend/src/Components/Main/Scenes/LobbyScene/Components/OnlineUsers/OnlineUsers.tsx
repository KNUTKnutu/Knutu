import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { OnlineUserClass } from "./Class/OnlineUser";
import OnlineUser from "./OnlineUser";

const generateRandomNumberForTest = (givenNumber: number): number => {
    return Math.floor(Math.random() * givenNumber);
}

const generateNameForTest = (): string => {
    switch(generateRandomNumberForTest(4)) {
        case 3: return "신이종";
        case 2: return "민경호";
        case 1: return "황여진";
        default: return "허강민";
    }
}

const generateUserInfoForTest = (): any => {
    return {
        name: generateNameForTest(),
        level: generateRandomNumberForTest(120)
    }
}

const OnlineUsers = (): JSX.Element => {

    const onlineUserArrayForTest = [];
    
    for (let i = 0; i < 45; i++) {
        onlineUserArrayForTest.push(generateUserInfoForTest());
    }

    onlineUserArrayForTest.sort((a, b) => {
        if(a.level > b.level) return -1;
        if(a.level < b.level) return 1;
        return 0;
    })
    
    const onlineUserList = onlineUserArrayForTest.map((user) => <OnlineUser key={generateRandomNumberForTest(1000000)} userInfo={user}/>)

    const userCountString = OnlineUserClass.getUserCountString(onlineUserArrayForTest.length);

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
  