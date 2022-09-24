import { AxiosError } from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  EMAIL,
  ID,
  STATUSCODE__UNAUTHORIZED,
} from "../../../../../../constant";
import { FINDSTATE } from "../../../../../../enum";
import { getFindPw } from "../../../../../../Logic/API/GET/get";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_findPw.module.scss";

interface FindPwProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: number;
  setIsError: Dispatch<SetStateAction<number>>;
  setCurrFind: Dispatch<SetStateAction<FINDSTATE>>;
  id: string;
  setId: Dispatch<SetStateAction<string>>;
}

const FindPw = ({
  setIsLoading,
  isError,
  setIsError,
  setCurrFind,
  id,
  setId,
}: FindPwProps) => {
  const [input, setInput] = useState({ email: "" });
  const { email } = input;

  /**
   * Input들 값을 바꿔주는 함수
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  /**
   * 비밀번호를 재설정 하기 위해 아이디와 이메일을 입력한 후 비밀번호 찾기를 누르면 실행되는 함수
   */
  const onClickFindPw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await getFindPw(id, email);
    if (res instanceof AxiosError) {
      switch (res.response?.status) {
        case STATUSCODE__UNAUTHORIZED:
          setIsError(STATUSCODE__UNAUTHORIZED);
          break;
        default:
          break;
      }
    } else {
      setCurrFind(FINDSTATE.CONFIRM_AUTH);
    }
    setIsLoading((prev) => !prev);
  };

  return (
    <form onSubmit={onClickFindPw}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          id="id"
          placeholder=" "
          name="id"
          value={id}
          onChange={onChangeId}
        />
        <label htmlFor="id">{ID}</label>
      </div>
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
          입력하신 아이디와 이메일에 맞는 유저가 없습니다.
        </span>
      )}
      <button>인증번호 발송</button>
    </form>
  );
};

export default FindPw;
