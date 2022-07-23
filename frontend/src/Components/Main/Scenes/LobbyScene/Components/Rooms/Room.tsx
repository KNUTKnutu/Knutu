import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { RoomClass } from "./Class/Room";
import { roomInfoInterface } from "./Interface/roomOption";

const Room = ({roomInfo}: roomInfoInterface): JSX.Element => {

    const {roomNumber, roomTitle, roomOption, roomRound, roomLimitTime, roomEntries, roomMaxEntry, roomIsPrivate} = roomInfo;

    const roomNumberString = RoomClass.getRoomNumberString(roomNumber);
    const roomOptionString = RoomClass.getRoomOptionString(roomOption);
    const roomRoundString = RoomClass.getRoomRoundString(roomRound, roomLimitTime);
    const roomIsPrivateString = RoomClass.getRoomIsPrivateString(roomIsPrivate);
    const roomIsFull = RoomClass.getRoomIsFull(roomEntries, roomMaxEntry);

    return (
        <div className={`${styles.lobby_scene_room}`}>
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
                            {roomEntries} / {roomMaxEntry}
                        </div>
                        <div>
                            {roomIsFull}
                        </div>
                    </div>
                    <div className={styles.room__is_private}>
                        {roomIsPrivateString ? "자물쇠" : "오픈방"}
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default Room;
  