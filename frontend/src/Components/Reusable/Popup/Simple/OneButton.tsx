import Dim from "../../../Dim/Dim";
import styles from "../../../../Styles/Components/Reusable/Popup/Simple/_oneButton.module.scss";
import { OneButtonProps } from "../../../../interface";

const OneButton = ({ text, buttonText, callback, id }: OneButtonProps) => {
  return (
    // TODO : id error 해결 필요. 이로 인해 build가 불가능
    <Dim id={id}>
      <div className={styles.modal_container}></div>
    </Dim>
  );
};

export default OneButton;
