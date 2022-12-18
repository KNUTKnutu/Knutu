import { SCENE__GAMESCENE } from "../../../../../../constant";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { RoomClass } from "./Class/Room";
import { roomInfoInterface } from "./Interface/roomOption";
import { useSetRecoilState } from 'recoil';
import { currentSceneState } from "../../../../../../Recoil/atom";

const Room = ({roomInfo}: any): JSX.Element => {

    const {number: roomNumber, title: roomTitle, mode: roomOption, lang, rounds: roomRound, limitTime: roomLimitTime, pw, currEntry: roomEntries, maxEntry: roomMaxEntry} = roomInfo;

    const roomNumberString = RoomClass.getRoomNumberString(roomNumber);
    const roomOptionString = RoomClass.getRoomOptionString(roomOption, lang);
    const roomRoundString = RoomClass.getRoomRoundString(roomRound, roomLimitTime);
    const roomEntryString = RoomClass.getRoomEntryString(roomEntries, roomMaxEntry);
    const roomIsPrivateString = RoomClass.getRoomIsPrivateString(pw);
    const roomIsFull = RoomClass.getRoomIsFull(roomEntries, roomMaxEntry);
    
    const setCurrentScene = useSetRecoilState(currentSceneState);

    const onRoomClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        setCurrentScene(SCENE__GAMESCENE);
    }

    return (
        <div className={`${styles.lobby_scene_room}`} onClick={onRoomClicked}>
            <div className={styles.room__number}>
                {roomNumberString}
            </div>
            <div className={styles.room__body}>
                <div className={styles.room__info}>
                    <div className={styles.room__title}>{roomTitle}</div>
                    <div>{roomOptionString}</div>
                    <div>{roomRoundString}</div>
                </div>
                <div className={styles.room__etcs}>
                    <div className={styles.room__entries}>
                        <div>
                            {roomEntryString}
                        </div>
                        <div>
                            {roomIsFull}
                        </div>
                    </div>
                    <div className={styles.room__is_private}>
                        {roomIsPrivateString}
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Room;
  