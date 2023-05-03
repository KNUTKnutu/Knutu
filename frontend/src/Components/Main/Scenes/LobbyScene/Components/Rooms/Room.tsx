import { SCENE__GAMESCENE } from "../../../../../../constant";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { RoomClass } from "./Class/Room";
import { roomInfoInterface } from "./Interface/roomOption";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentSceneState, enteredRoomIdState, userState } from "../../../../../../Recoil/atom";
import { checkRoomEnterable } from "../../../../../../Logic/API/GET/get";
import { postEnterRoom } from "../../../../../../Logic/API/POST/post";

// Props로 roomInfo 전달받음
// roomInfo: roomOptionInterface 준수하는 객체로 방 정보 담고 있음
const Room = ({roomInfo}: any): JSX.Element => {

    const {number: roomNumber, title: roomTitle, mode: roomOption, lang, rounds: roomRound, limitTime: roomLimitTime, pw, currEntry: roomEntries, maxEntry: roomMaxEntry} = roomInfo;
    // userRecoilValue Hook 사용해 userState 값을 user 라는 변수에 할당
    // userState는 Recoil에서 제공하는 전역 상태 저장소(atom)
    const user = useRecoilValue(userState);

    const roomNumberString = RoomClass.getRoomNumberString(roomNumber);
    const roomOptionString = RoomClass.getRoomOptionString(roomOption, lang);
    const roomRoundString = RoomClass.getRoomRoundString(roomRound, roomLimitTime);
    const roomEntryString = RoomClass.getRoomEntryString(roomEntries, roomMaxEntry);
    const roomIsPrivateString = RoomClass.getRoomIsPrivateString(pw);
    const roomIsFull = RoomClass.getRoomIsFull(roomEntries, roomMaxEntry);
    
    // useSetRecoilState: Recoil 상태를 업데이트하기 위한 Hook
    // ex) setEnteredRoomIdState(123) 호출하면 enteredRoomIdState 값 123으로 업데이트됨 => useRecoilValue(enteredRoomIdState) 호출하면 설정한 값 가져올 수 있음 (123)
    const setEnteredRoomIdState = useSetRecoilState(enteredRoomIdState);
    const setCurrentScene = useSetRecoilState(currentSceneState);

    // 클릭 이벤트가 발생하면 onRoomClicked 함수 실행됨
    const onRoomClicked = (e: React.MouseEvent<HTMLDivElement>) => {
        // 입력된 roomNumber에 해당하는 방이 입장 가능한지 확인하는 API 호출
        checkRoomEnterable(roomNumber)
            // checkRoomEnterable 함수가 성공적으로 실행되면 응답 res를 받음
            .then((res) => {
            // 서버로부터 받은 응답 res가 성공(state 200)이면 아래 코드 실행
            // ?. 연산자는 선택적 연산자
            // res가 null 또는 undefined일 경우 에러를 방지하기 위해 사용
            if(res?.status == 200) {
                // 입력된 roomNumber와 user 정보 서버로 보내 해당 방에 입장하는 API 호출
                postEnterRoom(roomNumber, user)
                    // postEnterRoom 함수가 성공적으로 실행되면 응답 res 받음
                    .then((res) => {
                        // enterendRoomIdState 상태를 roomNumber로 변경
                        setEnteredRoomIdState(roomNumber);
                        // currentSceneState 상태를 SCENE__GAMESCENE로 변경
                        setCurrentScene(SCENE__GAMESCENE);
                    });
            }
            // 서버로부터 받은 응답 res가 실패(200 X)면 아래 코드 실행
            else {
                // 경고창 띄워서 방 입장 불가능하다는 메시지 보여 줌
                window.alert("방에 입장할 수 없습니다. 잠시 후 다시 시도해주세요.");
            }
        });
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
  