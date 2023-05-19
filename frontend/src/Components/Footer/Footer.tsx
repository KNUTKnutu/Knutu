import styles from "../../styles/Components/Footer/_footer.module.scss";
import { useState, useRef } from 'react';

const Footer = (): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(2);
  const testDivContainer = useRef();

  let testInterval = null;

  const onDropdownValueChanged = (e): void => {
    setSelectedValue(Number(e.target.value));
  }

  const fireTest1 = (e): void => {
    // 여러분이 로직 작성하실 부분입니다.
  }

  const fireTest2 = (e): void => {
    // 제가 모의로 만든 테스트 로직입니다.
    
    if(testInterval !== null) return;
    
    const {current} = testDivContainer;

    while(current.lastElementChild) {
      current.removeChild(current.lastElementChild);
    }

    const charArr = ["안", "녕", "하", "세", "요"];
    let idx = 0;

    const appendSpan = () => {
      if(charArr[idx] === undefined) return testInterval = null;

      const span = document.createElement("span");
      span.textContent = charArr[idx];

      current.appendChild(span);

      idx++;

      testInterval = setTimeout(() => {
        appendSpan()
      }, 200);
    }

    appendSpan();
  }

  return (
    <footer className={styles.footer_container}>
      <select defaultValue="2" name="testSelect" onChange={onDropdownValueChanged}>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
        <option value="16">16</option>
        <option value="17">17</option>
        <option value="18">18</option>
        <option value="19">19</option>
        <option value="20">20</option>
      </select>
      <button onClick={fireTest1}>test 1</button>
      <button onClick={fireTest2}>test 2</button>
      <div className={styles.testDivContainer} ref={testDivContainer}>
      </div>
    </footer>
  );
};

export default Footer;
