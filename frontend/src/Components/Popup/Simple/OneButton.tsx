import Dim from "../../Dim/Dim";
import "./OneButton.css";

type Nullable<T> = T | null;

interface Props {
  text: Nullable<string>;
  buttonText: Nullable<string>;
  callback?(): void;
}

const OneButton = ({ text, buttonText, callback }: Props) => {
  return (
    <Dim>
      <div className="one_button_container">
        <div className="text_wrapper">
          <span>{text}</span>
        </div>
        <div className="button_wrapper">
          <button className="popup_btn" onClick={callback}>
            {buttonText}
          </button>
        </div>
      </div>
    </Dim>
  );
};

export default OneButton;
