import styles from "../../styles/Components/Footer/_footer.module.scss";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import KnutuAudioHandler from "../../Logic/Library/KnutuAudio/KnutuAudioHandler";

const Footer = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(2);
  const [word, setWord] = useState<string[]>([]);
  const testDivContainer = useRef<HTMLDivElement>(null);

  const options = [];
  for (let i = 2; i <= 20; i++) {
    options.push(i);
  }

  let testInterval: any = null;
  let IntervalTime: any = null;

  const onDropdownValueChanged = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedValue(Number(e.target.value));
  };
  useEffect(() => {
    // 선택된 값이 변경될 때마다 배열 크기 업데이트하여 "가"가 들어간 배열로 초기화
    setWord(Array.from({ length: selectedValue }).map(() => "가"));
  }, [selectedValue]);

  const fireTest1 = (e: any): void => {
    if (IntervalTime !== null) return;

    IntervalTime = 1000 / (selectedValue - 1);
    console.log(IntervalTime);
    const { current } = testDivContainer;

    if (current === null) return;

    while (current.lastElementChild) {
      current.removeChild(current.lastElementChild);
    }

    let idx = 0;
    const appendSpan = () => {
      if (word[idx] === undefined) return (testInterval = null);

      const span = document.createElement("span");
      span.textContent = word[idx];

      current.appendChild(span);

      idx++;

      testInterval = setTimeout(() => {
        appendSpan();
      }, IntervalTime);
    };

    appendSpan();
  };

  const fireTest2 = (e: any): void => {
    // 제가 모의로 만든 테스트 로직입니다.

    if (testInterval !== null) return;

    const { current } = testDivContainer;
    const audio = KnutuAudioHandler.getInstance();
    
    if (current === null) return;

    while (current.lastElementChild) {
      current.removeChild(current.lastElementChild);
    }

    const charArr = ["안", "녕", "하", "세", "요"];
    let idx = 0;

    const appendSpan = () => {
      if (charArr[idx] === undefined) {
        return (testInterval = null);
      }

      const span = document.createElement("span");
      span.textContent = charArr[idx];

      current.appendChild(span);
      audio.playOneShot(KnutuAudioHandler.clipOnWordAni);
      idx++;

      testInterval = setTimeout(() => {
        appendSpan();
      }, 200);
    };

    appendSpan();
  };

  return (
    <footer className={styles.footer_container}>
      <select
        defaultValue="2"
        name="testSelect"
        onChange={onDropdownValueChanged}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <button onClick={fireTest1}>test 1</button>
      <button onClick={fireTest2}>test 2</button>
      <div className={styles.testDivContainer} ref={testDivContainer}></div>
    </footer>
  );
};

export default Footer;
