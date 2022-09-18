import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
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
import { useSetRecoilState } from "recoil";
import { channelsState, userState } from "../../../../../../Recoil/atom";
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
  const { id, pw } = input;
  const [isPwVisi, setIsPwVisi] = useState(false);
  const [isError, setIsError] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userState);
  const setChannels = useSetRecoilState(channelsState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await get__signin(input);

    if (res instanceof AxiosError) {
      // 민경호 작업할 곳 - 401번 에러 처리 TODO
      switch (res?.response?.status) {
        case STATUSCODE__UNAUTHORIZED:
          setIsError(401);
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
                  <input type="checkbox" name="" id="remember_id" />
                  <label htmlFor="remember_id">아이디 기억하기</label>
                </div>
                <div>
                  <input type="checkbox" name="" id="auto_login" />
                  <label htmlFor="auto_login">자동로그인</label>
                </div>
              </div>
              {isError === 401 && (
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
