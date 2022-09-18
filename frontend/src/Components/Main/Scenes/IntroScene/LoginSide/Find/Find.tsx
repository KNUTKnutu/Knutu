import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { CHANGE_PW, EMAIL, ID, LOGIN, SINGNUP, TITLE } from "../../../../../../constant";
import { FINDSTATE, LOGINSTATE } from "../../../../../../enum";
import { getFindId, getFindPw } from "../../../../../../Logic/API/GET/get";
import { patchChangePw } from "../../../../../../Logic/API/PATCH/patch";
import hashing from "../../../../../../Logic/hashing";
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
  const [input, setInput] = useState({ id_email: "", pw_email: "", pw_id: "", pw_pw: "" });
  const [findIdResult, setFindIdResult] = useState("");
  const { id_email, pw_email, pw_id, pw_pw } = input;

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

  /**
   * res를 보여줄 UI를 작성해야함.
   */
  const onClickFindId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await getFindId(id_email);
    if(res instanceof AxiosError) {
      window.alert("입력하신 이메일에 맞는 유저가 없습니다.");
    } else {
      const { data } = res;
      setFindIdResult(data);
      setCurrFind(FINDSTATE.RESULT__FINDID);
    }
  };

  /**
   * 나중에 api_doc보고 getFindPw의 파라미터 바꿔야 함.
   * res를 보여줄 UI를 작성해야함.
   */
  const onClickFindPw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await getFindPw(pw_id, pw_email);
    if(res instanceof AxiosError) {
      window.alert("비밀번호가 틀렸습니다.");
    } else {
      setCurrFind(FINDSTATE.CHANGEPW);
    }
  };

  const onClickChangePw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashing_pw = hashing(pw_pw);
    const res = await patchChangePw(pw_id, hashing_pw);
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
          <form onSubmit={onClickFindId}>
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
          <form onSubmit={onClickFindPw}>
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
      case FINDSTATE.CHANGEPW:
        return (
          <form onSubmit={onClickChangePw}>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                id="pw_pw"
                placeholder=" "
                name="pw_pw"
                value={pw_pw}
                onChange={onChange}
              />
              <label htmlFor="pw_pw">{CHANGE_PW}</label>
            </div>
            <button>비밀번호 재설정</button>
          </form>
        );
      case FINDSTATE.RESULT__FINDID:
        return (
          <form onSubmit={onClickChangePw}>
            <div className={styles.input_wrapper}>
              <center>요청하신 아이디는 {findIdResult} 입니다.</center>
            </div>
          </form>
        );
      case FINDSTATE.RESULT__CHANGEPW:
        return (
          <form onSubmit={onClickChangePw}>
            <div className={styles.input_wrapper}>
              <input
                type="text"
                id="pw_pw"
                placeholder=" "
                name="pw_pw"
                value={pw_pw}
                onChange={onChange}
              />
              <label htmlFor="pw_pw">비밀번호 재설정을 완료하였습니다. 다시 로그인해주세요.</label>
            </div>
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
