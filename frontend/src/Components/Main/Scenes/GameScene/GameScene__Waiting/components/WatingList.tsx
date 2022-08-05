import styles from "../../../../../../styles/Components/Main/Scenes/GameScene/Wating/_gameWating.module.scss";
import WatingUser from "./WatingUser";

const generateRandomNumberForTest = (givenNumber: number): number => {
  return Math.floor(Math.random() * givenNumber);
};

const generateRandomUserNameForTest = (): String => {
  const rand = generateRandomNumberForTest(5);
  switch (rand) {
    case 3:
      return "신이종";
    case 2:
      return "민경호";
    case 1:
      return "황여진";
    default:
      return "허강민";
  }
};

const generateRandomTitleForTest = (): String => {
  const rand = generateRandomNumberForTest(4);
  switch (rand) {
    case 2:
      return "일곱빛깔무지개";
    case 1:
      return "오래된 화석";
    default:
      return "신생아";
  }
};

const generateUserInfoForTest = (): any => {
  return {
    userFull: 9,
    userProfile: "/src/Assets/Images/Knutu_64x64.jpg",
    userLevel: "Level " + generateRandomNumberForTest(100),
    userName: generateRandomUserNameForTest(),
    userTitle: generateRandomTitleForTest(),
  };
};

const WatingList = () => {
  const testuser = [];
  for (let i = 0; i < 9; i++) {
    testuser.push(generateUserInfoForTest());
  }
  const userlist = testuser.map((user) => (
    <WatingUser key={generateRandomNumberForTest(1000000)} userinfo={user} />
  ));
  return (
    <div>
      <div className={styles.wating_list}>{userlist}</div>
      <div className={styles.room_owner}>방장</div>
    </div>
  );
};

export default WatingList;
