import styles from "../../../Styles/Components/Reusable/Button/_button.module.scss";

interface ButtonProps {
  name: string;
  callback: () => void;
}

const Button = ({ name, callback }: ButtonProps) => {
  return (
    <div className={styles.button_wrapper}>
      <button></button>
    </div>
  );
};

export default Button;
