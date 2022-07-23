import styles from "../../../../../Styles/Components/Main/Scenes/GameScene/_gameScene.module.scss";

const GameScene__Waiting = ({_isGaming}: any): JSX.Element => {

    return (
        <div className={`${styles.game_scene__waiting_container} ${_isGaming}`}>
            GameScene Waiting
        </div>
    )
};

export default GameScene__Waiting;