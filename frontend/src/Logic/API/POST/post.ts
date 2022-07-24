import axios from "axios";
import { API_URL } from "../../../env";

interface SignUpProps {
  id: string;
  pw: string;
  name: string;
}

export const post__signup = async ({ id, pw, name }: SignUpProps) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, { id, pw, name });
    console.log(res);
    return res;
  } catch (err) {
    console.error(err);
  }
};
