import { useState } from "react";
import {
  LOGIN,
  SINGNUP,
  STATUSCODE__OK,
  STATUSCODE__UNAUTHORIZED,
  TITLE,
} from "../../../../../../constant";
import { FINDSTATE, LOGINSTATE } from "../../../../../../enum";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_find.module.scss";
import Spinner from "../../../../../Reusable/Spinner/Spinner";
import ChangePw from "./ChangePw";
import ConfirmAuth from "./ConfirmAuth";
import FindId from "./FindId";
import FindPw from "./FindPw";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const Find = ({ setCurrLoginState }: Props) => {
  const [id, setId] = useState("");
  /**
   * 아이디 찾기를 할 지 비밀번호 찾기를 설정할 때 사용
   * currFind에 따라 아이디 찾기 or 비밀번호 찾기로 변경
   */
  const [currFind, setCurrFind] = useState(FINDSTATE.ID);

  const [findIdResult, setFindIdResult] = useState("");

  /**
   * isLoading: axios 응답을 기다릴 때 Spinner를 불러올 수 있는 state
   */
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(0);

  /** 아이디 찾기와 비밀번호 찾기를 선택하는 이벤트 핸들러 */
  const onClickNav = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.nodeName === "SPAN") {
      const inner = target.innerText;
      if (inner === "아이디 찾기") {
        setIsError(0);
        setCurrFind(FINDSTATE.ID);
      } else if (inner === "비밀번호 찾기") {
        setIsError(0);
        setCurrFind(FINDSTATE.PW);
      }
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
          <FindId
            setIsLoading={setIsLoading}
            isError={isError}
            setIsError={setIsError}
            setCurrFind={setCurrFind}
            setFindIdResult={setFindIdResult}
          />
        );
      case FINDSTATE.PW:
        return (
          <FindPw
            isError={isError}
            setCurrFind={setCurrFind}
            setIsError={setIsError}
            setIsLoading={setIsLoading}
            id={id}
            setId={setId}
          />
        );
      case FINDSTATE.CHANGEPW:
        return (
          <ChangePw
            setCurrFind={setCurrFind}
            setIsLoading={setIsLoading}
            id={id}
          />
        );
      case FINDSTATE.RESULT__FINDID:
        return (
          <div>
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
          </div>
        );
      case FINDSTATE.RESULT__CHANGEPW:
        return (
          <div>
            <div
              className={styles.input_wrapper}
              style={{ textAlign: "center" }}
            >
              <span>비밀번호 재설정을 완료하였습니다.</span>
              <br />
              <span>다시 로그인해주세요.</span>
            </div>
          </div>
        );
      case FINDSTATE.CONFIRM_AUTH:
        return (
          <ConfirmAuth
            isError={isError}
            setCurrFind={setCurrFind}
            setIsError={setIsError}
            setIsLoading={setIsLoading}
          />
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
              currFind === FINDSTATE.PW ||
              currFind === FINDSTATE.CHANGEPW ||
              currFind === FINDSTATE.RESULT__CHANGEPW ||
              currFind === FINDSTATE.CONFIRM_AUTH
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
