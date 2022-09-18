import styles from "../../../Styles/Components/Reusable/Spinner/_spinner.module.scss";

interface SpinnerProps {
  text: string;
}

const Spinner = ({ text }: SpinnerProps) => {
  return (
    <div className={styles.spinner}>
      <div className={styles.loader}>Loading...</div>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

export default Spinner;
