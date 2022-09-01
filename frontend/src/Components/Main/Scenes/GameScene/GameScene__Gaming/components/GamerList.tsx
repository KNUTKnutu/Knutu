import { useState } from "react";
import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";
import OnGamer from "./OnGamer";

interface testuser {
  userinfo: {
    username: string;
    userprofile: string;
    userlevel: number;
    userscore: number;
  };
}

const GamerList = () => {
  const [member, setMember] = useState(7);

  const testuserinfo: testuser = {
    userinfo: {
      username: "허강민",
      userprofile: "/src/Assets/Images/Knutu_64x64.jpg",
      userlevel: 22,
      userscore: 0,
    },
  };

  return (
    <div className={styles.gamer_list}>
      {Array.from(Array(member)).map((_, i) => (
        <OnGamer key={i} userinfo={testuserinfo} />
      ))}
    </div>
  );
};

export default GamerList;
