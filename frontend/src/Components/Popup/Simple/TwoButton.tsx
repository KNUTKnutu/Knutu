import Dim from "../../Dim/Dim";
import "./TwoButton.css";

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
      <div className="two_button_container">
        <div className="text_wrapper">
          <span>{text}</span>
        </div>
        <div className="button_wrapper">
          <button className="popup_btn" onClick={leftButtonCallback}>
            {leftButtonText}
          </button>
          <button className="popup_btn" onClick={rightButtonCallback}>
            {rightButtonText}
          </button>
        </div>
      </div>
    </Dim>
  );
};

export default TwoButton;
