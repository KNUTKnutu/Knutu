import axios from "axios";
import { API_URL } from "../../../env";
import { RegexId, RegexPw } from "../../Regex/regex";

interface SignInProps {
  id: string;
  pw: string;
}

export const get__signin = async ({ id, pw }: SignInProps) => {
  // Regex
  if (RegexId.test(id) && RegexPw.test(pw)) {
    console.log("Signin 만족하네요~");
    /* try {
      const res = await axios.get(`${API_URL}/signin?id=${id}&pw=${pw}`);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    } */
  }
};
