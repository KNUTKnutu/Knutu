import styles from "../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";

const Navs = (): JSX.Element => {

    // 허강민 TODO: 방 만들기 팝업 제작
    const onClickMakeRoom = (): void => {
        
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
        <div className={`${styles.lobby_scene_navs} ${styles.lobby_scene_components}`}>
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
    );
  };
  
  export default Navs;
  