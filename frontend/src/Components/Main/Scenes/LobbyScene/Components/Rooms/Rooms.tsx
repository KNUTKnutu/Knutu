import { useRecoilValue } from "recoil";
import { roomsState } from "../../../../../../Recoil/atom";
import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { roomInfoInterface } from "./Interface/roomOption";
import Room from "./Room";

const Rooms = (): JSX.Element => {
    let rooms = useRecoilValue(roomsState);

    let testing = Object.entries(rooms);
    let roomList;


    if(Array.isArray(testing)) {
        let testingtwo: any = [];

        testing.forEach(ele => testingtwo.push(ele[1]));

        testingtwo.sort((a: any, b: any) => {
        if(a.number > b.number) return 1;
            if(a.number < b.number) return -1;
        return 0;
    });

        roomList = testingtwo.map((room: any) => {
            return <Room key={room.number} roomInfo={room}/>;
        });
    }

    return (
        <div className={`${styles.lobby_scene_rooms} ${styles.lobby_scene_components}`}>
            {roomList}
        </div>
    );
  };
  
  export default Rooms;
  