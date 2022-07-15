import axios from "axios";
import { API_URL } from "../../../env";

interface SignInProps {
  id: string;
  pw: string;
}

export const get__signin = async ({ id, pw }: SignInProps) => {
  try {
    const res = await axios.get(`${API_URL}/signin?id=${id}&pw=${pw}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
