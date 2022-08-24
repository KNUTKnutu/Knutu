import axios from "axios";
import { API_URL } from "../../../env";
import { RegexId, RegexPw } from "../../Regex/regex";

interface SignInProps {
  id: string;
  pw: string;
}

export const get__signin = async ({ id, pw }: SignInProps) => {
  // Regex
  // if (RegexId.test(id) && RegexPw.test(pw)) {
  //   console.log("ID, PW가 정규표현식을 만족합니다.");
  //   try {
  //     const res = await axios.get(`${API_URL}/signin?id=${id}&pw=${pw}`);
  //     return res;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // } else if (RegexId.test(id) === false) {
  //   console.log("ID가 정규표현식을 만족하지 않습니다.");
  // } else if (RegexPw.test(pw) === false) {
  //   console.log("PW가 정규표현식을 만족하지 않습니다.");
  // } else {
  //   console.log("모징..");
  // }
  console.log("Signin");
  try {
    const res = await axios.get(`${API_URL}/signin?id=${id}&pw=${pw}`);
    return res;
  } catch (err) {
    console.error(err);
  }
};
