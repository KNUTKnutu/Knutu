import { Nullable, Player } from "../../../interface";
import ProPic from "../../../Assets/Images/Deokgu/Deokgu3_64x64.jpeg";
import { RegexId, RegexPw } from "../../Regex/regex";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../env";

interface SignInProps {
  id: string;
  pw: string;
}

interface Channel {
  name: string;
  userCount: number;
}

type Channels = Channel[];

export const get__signin = async ({ id, pw }: SignInProps): Promise<Nullable<AxiosResponse | AxiosError>> => {
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
  // id가 정규표현식을 만족하냐?
  // pw가 정규표현식을 만족하냐?
  let statusCode;
  try {
    // 민경호 TODO, res의 statusCode가 401이라면 아디 혹은 비번이 틀렸음
    const res = await axios.get(`${API_URL}/signin?id=P${id}&pw=${pw}`);
    console.log(res);
    return res;
  } catch (e: any) {
    const axiosError: AxiosError = e;
    return axiosError;
  }
};

export const getChannelInfos = async (): Promise<Nullable<Channels>> => {
  try {
    const res = await axios.get(`${API_URL}/getChannelInfos`);
    const channels: Channels = res.data;
    return channels;
  } catch (e) {
    console.error(e);
    return null;
  }
}
