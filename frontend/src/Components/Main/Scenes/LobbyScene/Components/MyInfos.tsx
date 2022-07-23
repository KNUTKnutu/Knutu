import styles from "../../../../../Styles/Components/Main/Scenes/LobbyScene/_lobbyScene.module.scss";

const MyInfos = (): JSX.Element => {
    return (
        <div className={`${styles.lobby_scene_myInfos} ${styles.lobby_scene_components}`}>
            <div className={styles.lobby_scene_myInfos__top}>
                <div className={styles.lobby_scene_myInfos__name}>
                    신이종
                </div>
                <div className={styles.lobby_scene_myInfos__level}>
                    Lv 15
                </div>
            </div>
            <div className={styles.lobby_scene_myInfos__bottom}>
                <div className={styles.lobby_scene_myInfos__expFillColor} />
                <div className={styles.lobby_scene_myInfos__exp}>
                    86,482 / 104,800
                </div>
            </div>
        </div>
    );
  };
  
  export default MyInfos;
  