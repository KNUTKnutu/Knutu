import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../env";

export const patchChangePw = async (id: string, pw: string): Promise<AxiosResponse | AxiosError> => {
    try {
      const res = await axios.patch(`${API_URL}/changePw?id=${id}&pw=${pw}`);
      return res;
    } catch (e: any) {
      const error: AxiosError = e;
      console.error(error);
      return error;
    }
  };