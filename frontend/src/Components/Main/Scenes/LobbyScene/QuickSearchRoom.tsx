import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_quickSearch.module.scss";
import { currentSceneState, enteredRoomIdState, enteredRoomState, roomsState, userState } from "../../../../Recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { RoomClass } from "./Components/Rooms/Class/Room";
import { checkRoomEnterable } from "../../../../Logic/API/GET/get";
import { SCENE__GAMESCENE } from "../../../../constant";
import { postEnterRoom } from "../../../../Logic/API/POST/post";
import { Room } from "../../../../interface";

interface Props {
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const QuickSearchRoom = ({ setIsShow }: Props) => {
  const roomState = useRecoilValue(enteredRoomState);
  const { number: roomNumber } = roomState;
  const user = useRecoilValue(userState);

  const [roomNumberString, setRoomNumberString] = useState<string>(
    RoomClass.getRoomNumberString(roomNumber)
  );
  const [roomTitleString, setRoomTitleString] = useState("");
  const [quickRoom, setQuickRoom] = useState<Room | null>(null);

  const setEnteredRoomIdState = useSetRecoilState(enteredRoomIdState);
  const setCurrentScene = useSetRecoilState(currentSceneState);

  let rooms = useRecoilValue(roomsState);
  let roomValues = Object.entries(rooms);
    
  if (Array.isArray(roomValues) && quickRoom === null) {
    let quickEnterableRooms: Room[] = [];

    roomValues
      .filter((el) => el[1].currEntry / el[1].maxEntry < 1 && !el[1].pw)
      .forEach((el) => quickEnterableRooms.push(el[1]));

    quickEnterableRooms.sort((a: any, b: any) => {
      if (a.number > b.number) return 1;
      if (a.number < b.number) return -1;
      return 0;
    });
    
    const { number, title } = quickEnterableRooms[0];
    setQuickRoom(() => quickEnterableRooms[0]);
    setRoomNumberString(RoomClass.getRoomNumberString(number));
    setRoomTitleString(title);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (quickRoom === null) return;

    const roomToEnter: Room = quickRoom;
    const { number } = roomToEnter;
    checkRoomEnterable(number).then((res) => {
      if (res?.status !== 200) window.alert("방에 입장할 수 없습니다. 잠시 후 다시 시도해주세요.");
      postEnterRoom(number, user).then((res) => {
        setEnteredRoomIdState(number);
        setCurrentScene(SCENE__GAMESCENE);
        setIsShow(false);
      });
    });
  };

  return (
    <div className={styles.quickSearchRoom}>
      <div className={styles.title}>
        <h3>빠른 입장</h3>
      </div>
      <div className={styles.mid_box}></div>
      <div className={styles.main}>
        <form onSubmit={onSubmit}>
          {quickRoom !== null ? (
            <div>
              <div className = {styles.message_font_size}>
                {roomNumberString}번 방으로 입장합니다.
              </div>
              <div className = {styles.title_font_size}>
                방 제목: {roomTitleString}
              </div>
              <div className={styles.btn_wrapper}>
                <button type="submit">입장</button>
                <button
                  type="button"
                  onClick={(prev) => setIsShow(!prev)}>
                  나가기
                </button>
              </div>
            </div>
          ) : (
            <div className = {styles.message_font_size}>
              입장 가능한 방이 없습니다.
              <div className={styles.btn_wrapper}>
                <button type="button" onClick={(prev) => setIsShow(!prev)}>
                  나가기
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuickSearchRoom;