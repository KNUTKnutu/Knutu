import styles from "../../../../../../Styles/Components/Main/Scenes/GameScene/Gamming/_gameGamming.module.scss";

const Timer = () => {
  return (
    <div className={styles.timer}>
      <div>
        <div>
          <div>10초</div>
        </div>
      </div>
      <div>
        <div>
          <div>120초</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
