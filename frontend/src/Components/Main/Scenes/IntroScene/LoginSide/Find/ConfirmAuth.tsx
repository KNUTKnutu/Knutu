import { AxiosError } from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { STATUSCODE__UNAUTHORIZED } from "../../../../../../constant";
import { FINDSTATE } from "../../../../../../enum";
import { getConfirmAuth } from "../../../../../../Logic/API/GET/get";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_confirmAuth.module.scss";

interface ConfirmAuthProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isError: number;
  setIsError: Dispatch<SetStateAction<number>>;
  setCurrFind: Dispatch<SetStateAction<FINDSTATE>>;
}

const ConfirmAuth = ({
  setIsLoading,
  isError,
  setIsError,
  setCurrFind,
}: ConfirmAuthProps) => {
  const [input, setInput] = useState({ authCode: "" });
  const { authCode } = input;

  /**
   * Input들 값을 바꿔주는 함수
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onClickConfirmAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading((prev) => !prev);
    const res = await getConfirmAuth(authCode);
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

  return (
    <form onSubmit={onClickConfirmAuth}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          id="authCode"
          placeholder=" "
          name="authCode"
          value={authCode}
          onChange={onChange}
        />
        <label htmlFor="authCode">인증번호</label>
      </div>
      {isError === STATUSCODE__UNAUTHORIZED && (
        <span className={styles.error}>인증번호가 틀립니다.</span>
      )}
      <button>인증번호 확인</button>
    </form>
  );
};

export default ConfirmAuth;
