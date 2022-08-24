import axios from "axios";
import { API_URL } from "../../../env";
import { RegexId, RegexName, RegexPw } from "../../Regex/regex";

interface SignUpProps {
  id: string;
  pw: string;
  name: string;
}

export const post__signup = async ({ id, pw, name }: SignUpProps) => {
  // regex
  // 1. id가 regex를 만족하냐
  // 2. pw가 regex를 만족하냐
  // 3. name이 regex를 만족하냐
  console.log(`${API_URL}/signup?id=${id}&pw=${pw}&name=${name}`);
  if (RegexId.test(id) && RegexPw.test(pw) && RegexName.test(name)) {
    console.log("정규표현식이 만족합니다.");
    try {
      const res = await axios.post(
        `${API_URL}/signup?id=${id}&pw=${pw}&name=${name}`
      );
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  } else {
    console.log("정규표현식이 만족하지 않습니다.");
  }
};
