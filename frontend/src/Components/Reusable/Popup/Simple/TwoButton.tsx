import Dim from "../../../Dim/Dim";
import styles from "./_twoButton.module.scss";

type Nullable<T> = T | null;

interface Props {
  text: Nullable<string>;
  leftButtonText: Nullable<string>;
  leftButtonCallback?(): void;
  rightButtonText: Nullable<string>;
  rightButtonCallback?(): void;
}

const TwoButton = ({
  text,
  leftButtonText,
  leftButtonCallback,
  rightButtonText,
  rightButtonCallback,
}: Props) => {
  return (
    <Dim>
      <div className={styles.two_button_container}>
        <div className={styles.text_wrapper}>
          <span>{text}</span>
        </div>
        <div className={styles.button_wrapper}>
          <button className={styles.popup_btn} onClick={leftButtonCallback}>
            {leftButtonText}
          </button>
          <button className={styles.popup_btn} onClick={rightButtonCallback}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </Dim>
  );
};

export default TwoButton;
