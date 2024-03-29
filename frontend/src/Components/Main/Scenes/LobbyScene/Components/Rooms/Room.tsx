import { SCENE__GAMESCENE, SCENE__HOLDSCENE } from "../../../../../../constant";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { RoomClass } from "./Class/Room";
import { roomInfoInterface } from "./Interface/roomOption";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentSceneState, enteredRoomIdState, fallState, userState } from "../../../../../../Recoil/atom";
import { checkRoomEnterable } from "../../../../../../Logic/API/GET/get";
import { postEnterRoom } from "../../../../../../Logic/API/POST/post";

const Room = ({roomInfo}: any): JSX.Element => {

    const {number: roomNumber, title: roomTitle, mode: roomOption, lang, rounds: roomRound, limitTime: roomLimitTime, pw, currEntry: roomEntries, maxEntry: roomMaxEntry, isGaming: isPlaying} = roomInfo;
    const user = useRecoilValue(userState);

    const roomNumberString = RoomClass.getRoomNumberString(roomNumber);
    const roomOptionString = RoomClass.getRoomOptionString(roomOption, lang);
    const roomRoundString = RoomClass.getRoomRoundString(roomRound, roomLimitTime);
    const roomEntryString = RoomClass.getRoomEntryString(roomEntries, roomMaxEntry);
    const roomIsPrivateString = RoomClass.getRoomIsPrivateString(pw);
    const roomIsFull = RoomClass.getRoomIsFull(roomEntries, roomMaxEntry);
    
    const setEnteredRoomIdState = useSetRecoilState(enteredRoomIdState);
    const setCurrentScene = useSetRecoilState(currentSceneState);
    const setFallScene = useSetRecoilState(fallState);

    const onRoomClicked = async (e: React.MouseEvent<HTMLDivElement>) => {
        checkRoomEnterable(roomNumber).then((res) => {
            if(res?.status == 200) {
                setCurrentScene(SCENE__HOLDSCENE);
                setTimeout(() => setFallScene(true), 1000);
                const startTime = performance.now();
                postEnterRoom(roomNumber, user).then((res) => {
                    const endTime = performance.now();
                    const loadingTime = endTime - startTime;
                    const waitTime = loadingTime > 3000 ? loadingTime : 3000;
                    setTimeout(() => setFallScene(false), waitTime);
                    setEnteredRoomIdState(roomNumber);
                    setTimeout(() => setCurrentScene(SCENE__GAMESCENE), waitTime+1000);
                });
            }
            else {
                window.alert("방에 입장할 수 없습니다. 잠시 후 다시 시도해주세요.");
            }
        });
    }

    return (
        <div className={`${styles.lobby_scene_room} ${isPlaying ? styles.playing : ''}`} onClick={onRoomClicked}>
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
  