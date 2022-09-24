import { AxiosError } from "axios";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  CHANGE_PW,
  EMAIL,
  STATUSCODE__UNAUTHORIZED,
} from "../../../../../../constant";
import { FINDSTATE } from "../../../../../../enum";
import { getFindId } from "../../../../../../Logic/API/GET/get";
import { patchChangePw } from "../../../../../../Logic/API/PATCH/patch";
import hashing from "../../../../../../Logic/hashing";
import { RegexPw } from "../../../../../../Logic/Regex/regex";
import styles from "../../../../../../Styles/Components/Main/Scenes/IntroScene/LoginSide/Find/_findId.module.scss";

interface ChangePwProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCurrFind: Dispatch<SetStateAction<FINDSTATE>>;
  id: string;
}

const ChangePw = ({ setIsLoading, setCurrFind, id }: ChangePwProps) => {
  const [input, setInput] = useState({ pw: "" });
  const { pw } = input;

  /**
   * Input들 값을 바꿔주는 함수
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /**
   * 비밀번호를 재설정하는 함수
   */
  const onClickChangePw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // pw 정규표현식을 만족하는 지 확인하는 코드가 있어야 됨.
    const isConfirmPw = RegexPw.test(pw);
    if (isConfirmPw) {
      // 만족하면 밑의 코드가 실행됨.
      setIsLoading((prev) => !prev);
      const hashing_pw = hashing(pw);
      const res = await patchChangePw(id, hashing_pw);

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
        setCurrFind(FINDSTATE.RESULT__CHANGEPW);
      }
      setIsLoading((prev) => !prev);
    } else {
      alert("비밀번호가 형식을 만족하지 않습니다.");
      setInput({ ...input, pw: "" });
    }
  };

  return (
    <form onSubmit={onClickChangePw}>
      <div className={styles.input_wrapper}>
        <input
          type="text"
          id="pw"
          placeholder=" "
          name="pw"
          value={pw}
          onChange={onChange}
        />
        <label htmlFor="pw">{CHANGE_PW}</label>
      </div>
      <button>비밀번호 재설정</button>
    </form>
  );
};

export default ChangePw;
