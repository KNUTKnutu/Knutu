import Dim from "../../../Dim/Dim";
import styles from "../../../styles/Components/Popup/Dialog/_dialog.module.scss";

interface Props {
  main: JSX.Element;
  callback__OK?(): void;
  callback__CANCEL?(): void;
}

const Dialog = ({ main, callback__OK, callback__CANCEL }: Props) => {
  return (
    <Dim>
      <div className={styles.dialog_container}>
        <div className={styles.element_wrapper}>{main}</div>
        <div className={styles.button_wrapper}>
          <button className={styles.popup_btn} onClick={callback__OK}>
            OK
          </button>
          <button className={styles.popup_btn} onClick={callback__CANCEL}>
            CANCEL
          </button>
        </div>
      </div>
    </Dim>
  );
};

export default Dialog;
