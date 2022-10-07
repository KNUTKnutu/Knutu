import { useState } from "react";
import styles from "../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";
import Dim from "../../../../Dim/Dim";
import Dialog from "../../../../Reusable/Popup/Dialog/Dialog";
import MakeRoom from "../MakeRoom";

const Navs = (): JSX.Element => {
  const [isShow, setIsShow] = useState(false);

  const onClickMakeRoom = (): void => {
    setIsShow((prev) => !prev);
  };

  const onClickQuickSearch = (): void => {
    console.log("onClickQuickSearch");
  };

  const onClickFriend = (): void => {
    console.log("onClickFriend");
  };

  const onClickShop = (): void => {
    console.log("onClickShop");
  };

  return (
    <>
      <div
        className={`${styles.lobby_scene_navs} ${styles.lobby_scene_components}`}
      >
        <div className={styles.navs__makeRoom} onClick={onClickMakeRoom}>
          <span>방만들기</span>
        </div>
        <div className={styles.navs__quickSearch} onClick={onClickQuickSearch}>
          <span>빠른입장</span>
        </div>
        <div className={styles.navs__friend} onClick={onClickFriend}>
          <span>친구</span>
        </div>
        <div className={styles.navs__shop} onClick={onClickShop}>
          <span>상점</span>
        </div>
      </div>
      {isShow && <Dim children={<MakeRoom setIsShow={setIsShow} />} />}
    </>
  );
};

export default Navs;
