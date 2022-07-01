import Dim from "../../Dim/Dim";
import "./Dialog.css";

interface Props {
  main: JSX.Element;
  callback__OK?(): void;
  callback__CANCEL?(): void;
}

const Dialog = ({ main, callback__OK, callback__CANCEL }: Props) => {
  return (
    <Dim>
      <div className="dialog_container">
        <div className="element_wrapper">{main}</div>
        <div className="button_wrapper">
          <button className="popup_btn" onClick={callback__OK}>
            OK
          </button>
          <button className="popup_btn" onClick={callback__CANCEL}>
            CANCEL
          </button>
        </div>
      </div>
    </Dim>
  );
};

export default Dialog;
