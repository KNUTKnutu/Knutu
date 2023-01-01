import axios, { AxiosError, AxiosResponse } from "axios";
import { useSetRecoilState } from "recoil";
import { API_URL } from "../../../env";
import { User, Users } from "../../../interface";
import { usersState } from "../../../Recoil/atom";

interface EnterChannelProps {
  user: User;
  channelName: string;
}

/**
 * @returns 현재 채널에 들어와있는 유저 리스트를 리턴
 */
export const put__enterChannel = async ({
  user,
  channelName,
}: EnterChannelProps): Promise<AxiosResponse | AxiosError> => {
  try {
    let endPoint;

    endPoint = `${API_URL}/enterChannel/${channelName}`;
    const res__enterChannel = await axios.put(endPoint, user);

    if (res__enterChannel.status === 200) {
      endPoint = `${API_URL}/getChannelInfo?channelName=${channelName}`;
      const res__getChannelUsers = await axios.get(endPoint);

      return res__getChannelUsers;
    }

    return res__enterChannel;
  } catch (err: any) {
    const error: AxiosError = err;
    return error;
  }
};

export const put__exitRoom = 
  async (roomId: number, userName: string)
  : Promise<AxiosResponse | AxiosError> => {
    try {
      let endPoint;
  
      endPoint = `${API_URL}/exitRoom?roomId=${roomId}&userName=${userName}`;
      const res_exitRoom = await axios.put(endPoint);
  
      return res_exitRoom;
    } catch (err: any) {
      const error: AxiosError = err;
      return error;
    }
}
;