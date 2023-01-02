import styles from "../../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const Timer = () => {
  return (
    <div className={styles.timer}>
      <span>
        10초
      </span>
      <span>
        120초
      </span>
    </div>
  );
};

export default Timer;
