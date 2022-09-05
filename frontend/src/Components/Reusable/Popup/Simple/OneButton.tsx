import Dim from "../../../Dim/Dim";
import styles from "../../../../Styles/Components/Reusable/Popup/Simple/_oneButton.module.scss";
import { OneButtonProps } from "../../../../interface";

const OneButton = ({ text, buttonText, callback, id }: OneButtonProps) => {
  return (
    <Dim id={id}>
      <div className={styles.modal_container}></div>
    </Dim>
  );
};

export default OneButton;
