import Dim from "../Dim/Dim";
import OnButtonClick from "../../Assets/Audios/OnButtonClick.mp3";
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
          <button onClick={callback}>{buttonText}</button>
        </div>
      </div>
    </Dim>
  );
};

export default OneButton;
