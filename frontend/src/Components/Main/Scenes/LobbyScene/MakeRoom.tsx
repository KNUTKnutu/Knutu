import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  SCENE__GAMESCENE,
  GAMEMODE,
  LANGUAGE,
  LIMITTIME,
  MAXIMUM,
  SPECIALMODE,
} from "../../../../constant";
import { checkRoomEnterable, getAvailableRoomId } from "../../../../Logic/API/GET/get";
import { postEnterRoom, post__makeRoom } from "../../../../Logic/API/POST/post";
import { currentSceneState, userState } from "../../../../Recoil/atom";
import styles from "../../../../Styles/Components/Main/Scenes/LobbyScene/_makeScene.module.scss";

interface Props {
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

const MakeRoom = ({ setIsShow }: Props) => {
  const [roomInfo, setRoomInfo] = useState({
    title: "", // 방 이름
    isPw: false, // 비밀번호를 설정할 것인지 설정하지 않을 것인지
    pw: "", // 비밀번호
    maximum: 8, // 최대 인원
    time_limit: 60, // 제한 시간
    lang: "kor", // 언어
    mode: "end", // 게임 모드
    special: "", // 특수 규칙
  });
  
  const user = useRecoilValue(userState);
  const setCurrentScene = useSetRecoilState(currentSceneState);
  
  const { title, pw, isPw, maximum, time_limit, lang, mode, special } =
    roomInfo;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
  };

  const onClickIsPw = () => {
    setRoomInfo({ ...roomInfo, isPw: !isPw });
  };

  const onChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoomInfo({ ...roomInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(time_limit);
  }, [time_limit]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    getAvailableRoomId().then(res => {
      let roomId = res.data;

      const room = {
        roomId,
        ...roomInfo
      };

      post__makeRoom(room)
        .then((res) => {
          if(res?.status == 200) {
            checkRoomEnterable(roomId)
              .then((res) => {
                if(res?.status == 200) {
                  postEnterRoom(roomId, user)
                    .then((res) => {
                      console.log(res);
                      setCurrentScene(SCENE__GAMESCENE);
                    })
                }
              })
          }
        }).catch((e) => {
          console.error("failed to make room");
          console.error(e);
        })
    });
  };

  const onClickCancel = () => {
    setIsShow((prev) => !prev);
  };

  return (
    <div className={styles.makeRoom}>
      <div className={styles.title}>
        <h3>방 만들기</h3>
      </div>
      <div className={styles.main}>
        <form onSubmit={onSubmit}>
          <div className={styles.each}>
            <label htmlFor="title">방 이름</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="방 이름"
              onChange={onChange}
            />
          </div>
          <div className={styles.each}>
            <label htmlFor="pw">비밀번호</label>
            <div className={styles.pw_wrapper}>
              <input
                type="checkbox"
                name="isPw"
                id="isPw"
                onClick={onClickIsPw}
              />
              <input
                type="password"
                name="pw"
                id="pw"
                value={pw}
                disabled={!isPw}
                placeholder="비밀번호"
                onChange={onChange}
              />
            </div>
          </div>
          <div className={styles.each}>
            <label htmlFor="maximum">최대 인원</label>
            <select
              name="maximum"
              id="maximum"
              className={styles.maximum}
              value={maximum}
              onChange={onChangeSelect}
            >
              {MAXIMUM.map((cur, idx) => (
                <option key={idx} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.each}>
            <label htmlFor="time_limit">제한 시간</label>
            <div className={styles.time_limit}>
              {LIMITTIME.map((cur, idx) => {
                return (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="time_limit"
                      id={`${cur}s`}
                      value={`${cur}s`}
                      onChange={onChange}
                      checked={time_limit === cur ? true : false}
                    />
                    <label htmlFor={`${cur}s`}>{cur}초</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.each}>
            <label htmlFor="lang">언어</label>
            <div className={styles.lang}>
              {LANGUAGE.map((cur, idx) => {
                const { id, label } = cur;
                return (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="lang"
                      id={id}
                      value={id}
                      onChange={onChange}
                      checked={lang === id ? true : false}
                    />
                    <label htmlFor={id}>{label}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.each}>
            <label htmlFor="mode">게임 모드</label>
            <div className={styles.mode}>
              {GAMEMODE.map((cur, idx) => {
                const { id, label } = cur;
                return (
                  <div key={idx}>
                    <input
                      type="radio"
                      name="mode"
                      id={id}
                      value={id}
                      onChange={onChange}
                      checked={mode === id ? true : false}
                    />
                    <label htmlFor={id}>{label}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={`${styles.each} ${styles.blur}`}>
            <label htmlFor="special">특수 규칙</label>
            <div className={styles.special}>
              {SPECIALMODE.map((cur, idx) => {
                const { id, label } = cur;
                return (
                  <div key={idx}>
                    <input type="radio" name="special" id={id} value={id} />
                    <label htmlFor={id}>{label}</label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.btn_wrapper}>
            <button type="submit">방 만들기</button>
            <button type="button" onClick={onClickCancel}>
              나가기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeRoom;
