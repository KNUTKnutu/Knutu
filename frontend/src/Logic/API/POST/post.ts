import axios from "axios";
import { API_URL } from "../../../env";
import { RegexEmail, RegexId, RegexName, RegexPw } from "../../Regex/regex";

interface SignUpProps {
  id: string;
  pw: string;
  name: string;
  email: string;
}

export const post__signup = async ({ id, pw, name, email }: SignUpProps) => {
  // regex
  const isConfirmId = RegexId.test(id);
  const isConfirmPw = RegexPw.test(pw);
  const isConfirmName = RegexName.test(name);
  const isConfirmEmail = RegexEmail.test(email);

  if (isConfirmId && isConfirmPw && isConfirmName && isConfirmEmail) {
    console.log("정규표현식이 만족합니다.");
    try {
      const res = await axios.post(`${API_URL}/signup`, {
        id,
        pw,
        name,
        email,
      });
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("정규표현식이 만족하지 않습니다.");
  }
};
