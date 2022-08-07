import { ChangeEvent, useEffect, useState } from "react";
import { FloatingLabelProps } from "../../../interface";
import styles from "../../../Styles/Components/Reusable/FloatingLabel/_floatingLabel.module.scss";

const VISIBILITY = <span className="material-icons">visibility</span>;
const VISIBILITY_OFF = <span className="material-icons">visibility_off</span>;

const FloatingLabel = ({
  type,
  id,
  name,
  value,
  label,
  onChange,
}: FloatingLabelProps) => {
  const [isVisibility, setIsVisibility] = useState<boolean>(false);

  const onClickVisibility = () => {
    setIsVisibility((prev) => !prev);
  };

  useEffect(() => {
    // isVisibility가 true면 text가 보인다.
    // type이 text일 때는 적용되면 안됨.
    const inputEl = document.getElementById(id);
    if (type === "password" && inputEl) {
      isVisibility
        ? inputEl.setAttribute("type", "text")
        : inputEl.setAttribute("type", "password");
    }
  }, [isVisibility]);
  return (
    <div className={styles.floating_label}>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder=" "
      />
      <label htmlFor={id}>{label}</label>
      {type === "password" && (
        <div className={styles.visibility} onClick={onClickVisibility}>
          {isVisibility ? VISIBILITY_OFF : VISIBILITY}
        </div>
      )}
    </div>
  );
};

export default FloatingLabel;
