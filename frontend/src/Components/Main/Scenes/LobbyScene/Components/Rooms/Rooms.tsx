import styles from "../../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import { roomInfoInterface } from "./Interface/roomOption";
import Room from "./Room";

// const generateRandomNumberForTest = (givenNumber: number): number => {
//     return Math.floor(Math.random() * givenNumber);
// }

// const generateRandomTitleForTest = (): String => {
//     const rand = generateRandomNumberForTest(4);
//     switch(rand) {
//         case 3: return "제천의 자랑 신이종";
//         case 2: return "강릉과 인천을 잇는 뜨거운 사랑";
//         case 1: return "Cardi H";
//         default: return "불광동 여심폭격기";
//     }
// }

// const generateRandomMajorModeForTest = (): String => {
//     const rand = generateRandomNumberForTest(3);
//     switch(rand) {
//         case 2: return "한국어 끝말잇기";
//         case 1: return "한국어 쿵쿵따";
//         default: return "영어 끝말잇기";
//     }
// }

// const generateRandomAdditionalModeForTest = (): String => {
//     const rand = generateRandomNumberForTest(3);
//     switch(rand) {
//         case 2: return "어인정";
//         case 1: return "매너";
//         default: return "";
//     }
// } 

// const generateRoomInfoForTest = (): any => {

//     const roomMaxEntry = generateRandomNumberForTest(7) + 2;
//     const roomEntries = roomMaxEntry - generateRandomNumberForTest(roomMaxEntry);

//     return {
//         roomNumber: generateRandomNumberForTest(123),
//         roomTitle: generateRandomTitleForTest(),
//         roomOption: {
//             majorMode: generateRandomMajorModeForTest(),
//             additionalAllowedMode: generateRandomAdditionalModeForTest()
//         },
//         roomRound: generateRandomNumberForTest(9) + 1,
//         roomLimitTime: (generateRandomNumberForTest(5) + 1) * 30 ,
//         roomEntries,
//         roomMaxEntry,
//         roomIsPrivate: false
//     }
// }

const Rooms = (): JSX.Element => {

    // const roomArrayForTest = [];
    
    // for (let i = 0; i < 45; i++) {
    //     roomArrayForTest.push(generateRoomInfoForTest());
    // }

    // roomArrayForTest.sort((a, b) => {
    //     if(a.roomNumber > b.roomNumber) return 1;
    //     if(a.roomNumber < b.roomNumber) return -1;
    //     return 0;
    // })
    
    // const roomList = roomArrayForTest.map((room) => <Room key={generateRandomNumberForTest(1000000)} roomInfo={room}/>)

    return (
        <div className={`${styles.lobby_scene_rooms} ${styles.lobby_scene_components}`}>
            {/* {roomList} */}
        </div>
    );
  };
  
  export default Rooms;
  