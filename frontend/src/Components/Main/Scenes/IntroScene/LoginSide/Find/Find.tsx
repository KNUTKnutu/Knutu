import { AxiosError } from "axios";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import {
  CHANGE_PW,
  EMAIL,
  ID,
  LOGIN,
  SINGNUP,
  STATUSCODE__OK,
  STATUSCODE__UNAUTHORIZED,
  TITLE,
} from "../../../../../../constant";
import { FINDSTATE, LOGINSTATE } from "../../../../../../enum";
import { getFindId, getFindPw } from "../../../../../../Logic/API/GET/get";
import { patchChangePw } from "../../../../../../Logic/API/PATCH/patch";
import hashing from "../../../../../../Logic/hashing";
import { RegexPw } from "../../../../../../Logic/Regex/regex";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_find.module.scss";
import Spinner from "../../../../../Reusable/Spinner/Spinner";

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
  const [input, setInput] = useState({
    id_email: "",
    pw_email: "",
    pw_id: "",
    pw_pw: "",
  });
  const [findIdResult, setFindIdResult] = useState("");
  /**
   * isLoading: axios 응답을 기다릴 때 Spinner를 불러올 수 있는 state
   */
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(0);
  const { id_email, pw_email, pw_id, pw_pw } = input;

  /** 아이디 찾기와 비밀번호 찾기를 선택하는 이벤트 핸들러 */
  const onClickNav = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.nodeName === "SPAN") {
      const inner = target.innerText;
      if (inner === "아이디 찾기") {
        setIsError(0);
        setCurrFind(FINDSTATE.ID);
        setInput({ ...input, id_email: "" });
      } else if (inner === "비밀번호 찾기") {
        setIsError(0);
        setCurrFind(FINDSTATE.PW);
        setInput({ ...input, pw_email: "", pw_id: "" });
      }
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
    setIsLoading((prev) => !prev);
    const res = await getFindId(id_email);
    if (res instanceof AxiosError) {
      switch (res.response?.status) {
        case STATUSCODE__UNAUTHORIZED:
          setIsError(STATUSCODE__UNAUTHORIZED);
          break;
        default:
          break;
      }
    } else {
      const { data } = res;
      setFindIdResult(data);
      setIsError(0);
      setCurrFind(FINDSTATE.RESULT__FINDID);
    }
    setIsLoading((prev) => !prev);
  };

  /**
   * 나중에 api_doc보고 getFindPw의 파라미터 바꿔야 함.
   * res를 보여줄 UI를 작성해야함.
   */
  const onClickFindPw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await getFindPw(pw_id, pw_email);
    if (res instanceof AxiosError) {
      switch (res.response?.status) {
        case STATUSCODE__UNAUTHORIZED:
          setIsError(STATUSCODE__UNAUTHORIZED);
          break;
        default:
          break;
      }
    } else {
      setCurrFind(FINDSTATE.CHANGEPW);
    }
    setIsLoading((prev) => !prev);
  };

  const onClickChangePw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // pw 정규표현식을 만족하는 지 확인하는 코드가 있어야 됨.
    const isConfirmPw = RegexPw.test(pw_pw);
    if (isConfirmPw) {
      // 만족하면 밑의 코드가 실행됨.
      setIsLoading((prev) => !prev);
      const hashing_pw = hashing(pw_pw);
      const res = await patchChangePw(pw_id, hashing_pw);

      if (res instanceof AxiosError) {
        // 혹시 에러가 발생할 수 있어서 남겨둠.
        switch (res.response?.status) {
          case STATUSCODE__UNAUTHORIZED:
            break;
          default:
            break;
        }
      } else {
        alert("성공적으로 비밀번호가 변경되었습니다.");
        setCurrLoginState(LOGINSTATE.LOGIN);
      }
      setIsLoading((prev) => !prev);
    } else {
      alert("비밀번호가 형식을 만족하지 않습니다.");
      setInput({ ...input, pw_pw: "" });
    }
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
            {isError === STATUSCODE__UNAUTHORIZED && (
              <span className={styles.error}>
                입력하신 이메일에 맞는 유저가 없습니다.
              </span>
            )}
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
            {isError === STATUSCODE__UNAUTHORIZED && (
              <span className={styles.error}>
                입력하신 아이디와 이메일에 맞는 유저가 없습니다.
              </span>
            )}
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
            <div
              className={styles.input_wrapper}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>요청하신 아이디는 {findIdResult} 입니다.</span>
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
              <label htmlFor="pw_pw">
                비밀번호 재설정을 완료하였습니다. 다시 로그인해주세요.
              </label>
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
          <span
            className={
              currFind === FINDSTATE.ID || currFind === FINDSTATE.RESULT__FINDID
                ? styles.focus
                : ""
            }
          >
            아이디 찾기
          </span>
          <span
            className={
              currFind === FINDSTATE.PW || currFind === FINDSTATE.CHANGEPW
                ? styles.focus
                : ""
            }
          >
            비밀번호 찾기
          </span>
        </div>
        <div className={styles.curr_find}>
          {!isLoading ? condi_find(currFind) : <Spinner text="" />}
        </div>
        <div className={styles.sub}>
          <span onClick={onClickLogin}>{LOGIN}</span>|
          <span onClick={onClickSignup}>{SINGNUP}</span>
        </div>
      </div>
    </div>
  );
};

export default Find;
