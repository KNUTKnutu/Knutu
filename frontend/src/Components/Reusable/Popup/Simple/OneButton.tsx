import { Nullable } from "../../../../Logic/Library/CommonTypes/CommonTypes";
import Dim from "../../../Dim/Dim";
import styles from "./_oneButton.module.scss";

interface Props {
  text: Nullable<string>;
  buttonText: Nullable<string>;
  callback?(): void;
}

const OneButton = ({ text, buttonText, callback }: Props) => {
  return (
    <Dim>
      <div className={styles.one_button_container}>
        <div className={styles.text_wrapper}>
          <span>{text}</span>
        </div>
        <div className={styles.button_wrapper}>
          <button className={styles.popup_btn} onClick={callback}>
            {buttonText}
          </button>
        </div>
      </div>
    </Dim>
  );
};

export default OneButton;
