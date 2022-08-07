import axios from "axios";
import { API_URL } from "../../../env";
import { RegexId, RegexPw } from "../../Regex/regex";

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
  if (RegexId.test(id) && RegexPw.test(pw)) {
    console.log("SignUp 만족하네요~");
    /* try {
      const res = await axios.post(
        `${API_URL}/signup?id=${id}&pw=${pw}&name=${name}`
      );
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    } */
  }
};
