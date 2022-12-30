import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  ID,
  LOGIN,
  PW,
  SINGNUP,
  STATUSCODE__INTERNAL_SERVER_ERROR,
  STATUSCODE__OK,
  STATUSCODE__UNAUTHORIZED,
  TITLE,
} from "../../../../../../constant";
import { LOGINSTATE } from "../../../../../../enum";
import {
  getChannelInfos,
  get__signin,
} from "../../../../../../Logic/API/GET/get";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Login/_login.module.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { channelsState, isLoggedOutRecently, userState } from "../../../../../../Recoil/atom";
import { unwatchFile } from "fs";
import { AxiosError } from "axios";
import Spinner from "../../../../../Reusable/Spinner/Spinner";

interface Props {
  setCurrLoginState: React.Dispatch<React.SetStateAction<LOGINSTATE>>;
}

const VISIBILITY_ON = <span className="material-icons">visibility</span>;
const VISIBILITY_OFF = <span className="material-icons">visibility_off</span>;

const Login = ({ setCurrLoginState }: Props) => {
  
  const [input, setInput] = useState({ id: "", pw: "" });
  const [isPwVisi, setIsPwVisi] = useState(false);
  const [isError, setIsError] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberId, setIsRememberId]: any = useState(false);
  const [isAutoLogin, setIsAutoLogin]: any = useState(false);

  const setUser = useSetRecoilState(userState);
  const setChannels = useSetRecoilState(channelsState);

  const isLoggedOut = useRecoilValue(isLoggedOutRecently);

  let { id, pw } = input;

  useEffect(() => {
    // 게임을 실행하여 인트로씬에 들어온 최초 1회에 한해서만 자동 로그인이 시도되어야 함.
    if(isLoggedOut === true) return;

    // Auto Login 체크박스가 체크되어 있는 경우, 자동 로그인을 시도.
    const userFromLocalStorage = localStorage.getItem("user")!;
    if(userFromLocalStorage != "null" && userFromLocalStorage != null) {
      const userAccountJSON = JSON.parse(userFromLocalStorage);
      const {id: ID, pw: PW, rememberId, autoLogin} = userAccountJSON;
      input.id = ID;
      if(autoLogin) {
        input.pw = PW;
        setIsAutoLogin(true);
        onSubmit();
      }
      if(rememberId) {
        // 조건문은 타는데, UI 상의 체크박스에 checked가 들어가지 않음.
        // 자동로그인도 마찬가지임. 체크 필요.
        setIsRememberId(true);
      }
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onIsRememberIdChange = (): void => setIsRememberId((curr: any) => !curr);
  const onIsAutoLoginChange = (): void => setIsAutoLogin((curr: any) => !curr);

  const onSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await get__signin(input);

    if (isAutoLogin) {
      localStorage.setItem("user", JSON.stringify({
        id,
        pw,
        autoLogin: true
      }));
    } else if (isRememberId) {
      localStorage.setItem("user", JSON.stringify({
        id,
        rememberId: true
      }));
    }

    if (res instanceof AxiosError) {
      // 민경호 작업할 곳 - 401번 에러 처리 TODO
      switch (res?.response?.status) {
        case STATUSCODE__UNAUTHORIZED:
          setIsError(STATUSCODE__UNAUTHORIZED);
          break;
        default:
          break;
      }
    } else {
      const channels = await getChannelInfos();
      if (channels !== null) {
        setUser(res?.data);
        const channelsForRecoil = channels.map((val) => {
          const { name, userCount } = val;
          return {
            name,
            userCount,
          };
        });
        setChannels(channelsForRecoil);
      }
    }
    setIsLoading((prev) => !prev);
  };

  const onClickSignup = () => {
    setCurrLoginState(LOGINSTATE.SIGNUP);
  };

  const onClickFind = () => {
    setCurrLoginState(LOGINSTATE.FIND);
  };

  const onClickVisi = () => {
    setIsPwVisi((prev) => !prev);
  };

  // 아이디 저장과 자동 로그인 로직은 추후 구현 예정
  return (
    <div className={styles.login}>
      {!isLoading ? (
        <>
          <div className={styles.title}>
            <h2>{TITLE}</h2>
          </div>
          <div className={styles.form}>
            <form onSubmit={onSubmit}>
              <div className={styles.input_wrapper}>
                <input
                  type="text"
                  id="id"
                  placeholder=" "
                  name="id"
                  value={id}
                  onChange={onChange}
                />
                <label htmlFor="id">{ID}</label>
              </div>
              <div className={styles.input_wrapper}>
                <input
                  type={isPwVisi ? "text" : "password"}
                  id="pw"
                  placeholder=" "
                  name="pw"
                  value={pw}
                  onChange={onChange}
                />
                <label htmlFor="pw">{PW}</label>
                <div className={styles.visi_icon} onClick={onClickVisi}>
                  {isPwVisi ? VISIBILITY_ON : VISIBILITY_OFF}
                </div>
              </div>
              <div className={styles.remember}>
                <div>
                  <input type="checkbox" name="" id="remember_id" value={isRememberId} onChange={onIsRememberIdChange} />
                  <label htmlFor="remember_id">아이디 기억하기</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="auto_login" value={isAutoLogin} onChange={onIsAutoLoginChange} />
                  <label htmlFor="auto_login">자동로그인</label>
                </div>
              </div>
              {isError === STATUSCODE__UNAUTHORIZED && (
                <div style={{ color: "red", marginTop: "4px" }}>
                  아이디와 비밀번호를 확인 후 다시 입력해주세요.
                </div>
              )}
              <button>{LOGIN}</button>
              <div className={styles.sub}>
                <span onClick={onClickSignup}>{SINGNUP}</span>|
                <span onClick={onClickFind}>아이디/비밀번호 찾기</span>
              </div>
            </form>
          </div>
        </>
      ) : (
        <Spinner text="로그인 중..." />
      )}
    </div>
  );
};

export default Login;
