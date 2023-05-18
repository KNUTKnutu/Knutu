import { AxiosError } from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { EMAIL, STATUSCODE__UNAUTHORIZED } from "../../../../../../constant";
import { FINDSTATE } from "../../../../../../enum";
import { getFindId } from "../../../../../../Logic/API/GET/get";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_findId.module.scss";
import KnutuWebSocketHandler from './../../../../../../Logic/Library/KnutuWebSocket/KnutuWebSocketHandler';

interface FindIdProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: number;
  setIsError: Dispatch<SetStateAction<number>>;
  setCurrFind: Dispatch<SetStateAction<FINDSTATE>>;
  setFindIdResult: Dispatch<SetStateAction<string>>;
}

const FindId = ({
  setIsLoading,
  isError,
  setIsError,
  setCurrFind,
  setFindIdResult,
}: FindIdProps) => {
  const [input, setInput] = useState({ email: "" });
  const { email } = input;

  /**
   * Input들 값을 바꿔주는 함수
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /**
   * 아이디를 찾기 위해 이메일을 입력한 후 아이디 찾기를 누르면 실행되는 함수
   */
  const onClickFindId = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await getFindId(email);
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

  return (
    <form onSubmit={onClickFindId}>
      <div className={styles.input_wrapper}>
        <input
          type="email"
          id="email"
          placeholder=" "
          name="email"
          value={email}
          onChange={onChange}
        />
        <label htmlFor="email">{EMAIL}</label>
      </div>
      {isError === STATUSCODE__UNAUTHORIZED && (
        <span className={styles.error}>
          입력하신 이메일에 맞는 유저가 없습니다.
        </span>
      )}
      <button>아이디 찾기</button>
    </form>
  );
};

export default FindId;
