import { ChangeEvent, MouseEvent, useState } from "react";
import { EMAIL, ID, LOGIN, SINGNUP, TITLE } from "../../../../../../constant";
import { FINDSTATE, LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_find.module.scss";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const Find = ({ setCurrLoginState }: Props) => {
  /**
   * 아이디 찾기를 할 지 비밀번호 찾기를 설정할 때 사용
   * currFind에 따라 아이디 찾기 or 비밀번호 찾기로 변경
   */
  const [currFind, setCurrFind] = useState(FINDSTATE.ID);
  /**
   * id_email: id를 찾는데 쓰이는 email
   * pw_email: pw를 찾는데 쓰이는 email
   * pw_id: pw를 찾는데 쓰이는 id
   */
  const [input, setInput] = useState({ id_email: "", pw_email: "", pw_id: "" });
  const { id_email, pw_email, pw_id } = input;

  /** 아이디 찾기와 비밀번호 찾기를 선택하는 이벤트 핸들러 */
  const onClickNav = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.nodeName === "SPAN") {
      const inner = target.innerText;
      if (inner === "아이디 찾기") setCurrFind(FINDSTATE.ID);
      else if (inner === "비밀번호 찾기") setCurrFind(FINDSTATE.PW);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onClickLogin = () => {
    setCurrLoginState(LOGINSTATE.LOGIN);
  };

  const onClickSignup = () => {
    setCurrLoginState(LOGINSTATE.SIGNUP);
  };

  const condi_find = (currFind: FINDSTATE) => {
    switch (currFind) {
      case FINDSTATE.ID:
        return (
          <form>
            <div className={styles.input_wrapper}>
              <input
                type="email"
                id="id_email"
                placeholder=" "
                name="id_email"
                value={id_email}
                onChange={onChange}
              />
              <label htmlFor="id_email">{EMAIL}</label>
            </div>
            <button>아이디 찾기</button>
          </form>
        );
      case FINDSTATE.PW:
        return (
          <form>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                id="pw_id"
                placeholder=" "
                name="pw_id"
                value={pw_id}
                onChange={onChange}
              />
              <label htmlFor="pw_id">{ID}</label>
            </div>
            <div className={styles.input_wrapper}>
              <input
                type="email"
                id="pw_email"
                placeholder=" "
                name="pw_email"
                value={pw_email}
                onChange={onChange}
              />
              <label htmlFor="pw_email">{EMAIL}</label>
            </div>
            <button>비밀번호 찾기</button>
          </form>
        );
    }
  };
  return (
    <div className={styles.find}>
      <div className={styles.title}>
        <h2>{TITLE}</h2>
      </div>
      <div className={styles.main}>
        <div className={styles.choice_find} onClick={onClickNav}>
          <span className={currFind === FINDSTATE.ID ? styles.focus : ""}>
            아이디 찾기
          </span>
          <span className={currFind === FINDSTATE.PW ? styles.focus : ""}>
            비밀번호 찾기
          </span>
        </div>
        <div className={styles.curr_find}>{condi_find(currFind)}</div>
        <div className={styles.sub}>
          <span onClick={onClickLogin}>{LOGIN}</span>|
          <span onClick={onClickSignup}>{SINGNUP}</span>
        </div>
      </div>
    </div>
  );
};

export default Find;
