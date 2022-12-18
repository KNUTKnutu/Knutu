import { Nullable, Player } from "../../../interface";
import ProPic from "../../../Assets/Images/Deokgu/Deokgu3_64x64.jpeg";
import { RegexId, RegexPw } from "../../Regex/regex";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../../../env";
import hashing from "../../hashing";

interface SignInProps {
  id: string;
  pw: string;
}

interface Channel {
  name: string;
  userCount: number;
}

type Channels = Channel[];

export const getCheckIfServerBooted = async (): Promise<Nullable<AxiosResponse | AxiosError>> => {
  try {
    return await axios.get(`${API_URL}/serverAlive`);
  } catch (e: any) {
    const axiosError: AxiosError = e;
    return axiosError;
  }
};

export const get__signin = async ({
  id,
  pw,
}: SignInProps): Promise<Nullable<AxiosResponse | AxiosError>> => {
  // Regex
  let statusCode;
  try {
    const hashing_pw = hashing(pw);
    const res = await axios.get(`${API_URL}/signin?id=${id}&pw=${hashing_pw}`);
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
};

export const getFindId = async (email: string) => {
  try {
    const res = await axios.get(`${API_URL}/findId?email=${email}`);
    return res;
  } catch (e: any) {
    const error: AxiosError = e;
    console.error(error);
    return error;
  }
};

export const getFindPw = async (id: string, email: string) => {
  try {
    const res = await axios.get(`${API_URL}/findPw?id=${id}&email=${email}`);
    return res;
  } catch (e: any) {
    const error: AxiosError = e;
    console.error(error);
    return error;
  }
};

export const getConfirmAuth = async (authCode: string) => {
  try {
    const res = await axios.get(`${API_URL}/confirmAuth?authCode=${authCode}`);
    return res;
  } catch (e: any) {
    const error: AxiosError = e;
    console.error(error);
    return error;
  }
};

export const getAvailableRoomId = async () => {
  try {
    const res = await axios.get(`${API_URL}/getAvailableRoomId`);
    return res;
  }
  catch (e: any) {
    const error: AxiosError = e;
    console.error(error);
    return error;
  }
}

export const checkRoomEnterable = async (roomId: number) => {
  try {
    const res = await axios.get(`${API_URL}/checkRoomEnterable?roomId=${roomId}`);
    return res;
  }
  catch (e: any) {
    const error: AxiosError = e;
    console.error(error);
    return error;
  }
}