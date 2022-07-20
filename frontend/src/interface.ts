import { SetStateAction } from "react";
import { LOGINSTATE } from "./enum";

// Channel
export interface ChannelProps {
  channel_name: string;
  current_people: number;
}

export interface ChannelSideProps {
  list: ChannelProps[];
}

// Login
export interface BeforeProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}

export interface LoginIngProps {
  setLoginState: React.Dispatch<SetStateAction<LOGINSTATE>>;
}
