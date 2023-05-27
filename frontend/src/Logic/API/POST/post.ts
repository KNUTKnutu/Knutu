import axios from "axios";
import { title } from "process";
import { API_URL } from "../../../env";
import hashing from "../../hashing";
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
      const hashing_pw = hashing(pw);
      const res = await axios.post(`${API_URL}/signup`, {
        id,
        pw: hashing_pw,
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

export const post__makeRoom = async (_roomInfo: any) => {
  try {
    const {roomId, title, mode, lang, rounds, time_limit: limitTime, maximum: maxEntry, pw, roundWord, currWord} = _roomInfo;
    const roomInfo = {
      ..._roomInfo,
      number: roomId,
      title,
      lang,
      mode,
      rounds,
      limitTime,
      currEntry: 0,
      maxEntry,
      pw,
      players: [],
      roundWord,
      currWord
    }
    const res = await axios.post(`${API_URL}/makeRoom`, {
      ...roomInfo
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const postProfilePicture = async (_file: File, _userId: string) => {
  try {
    const formData = new FormData();
    formData.append('_file', _file);

    const res = await axios.post(`${API_URL}/profilePicture?userId=${_userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    
    return res;
  } catch (e: any) {
    console.error(e);
    return e;
  }
};

// TODO : any 를 타입 선언해야함
export const postEnterRoom = async (roomId: any, user: any) => {
  try {
    const res = await axios.post(`${API_URL}/enterRoom?roomId=${roomId}`, {
      ...user
    });
    return res;
  } catch (e: any) {
    console.error(e);
    return e;
  }
}