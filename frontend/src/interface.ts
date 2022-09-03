import { ChangeEvent, SetStateAction } from "react";
import { LOGINSTATE } from "./enum";

export type Nullable<T> = null | T;

// Channel
export interface ChannelProps {
  name: string;
  visitor: number;
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

export interface Preference {
  language: string; // 설정한 언어. Default => Korean
  isAccountDisabled: boolean; // 유저의 요청에 따른 계정 비활성화 여부
  masterVolume: number; // 유저가 설정한 마스터 볼륨값
}

export interface User {
  id?: string; // 아이디
  pw?: string; // 비밀번호
  name?: string; // 닉네임
  title?: string; // 칭호
  profilePicture?: string; // 프로필 사진 Firebase Storage URI String. '' == 끄누투
  preference?: Preference; // 개인 환경 설정
  level?: number; // 현재 레벨
  currentExperience?: number; // 현재 경험치
  totalExperience?: number; // 총 누적 경험치
  created_time?: number; // 유저 생성일자
  updated_time?: number; // 유저가 마지막으로 업데이트 된 시점 timestamp
  reputation?: number; // 유저 칭찬점수(평판)
  reportedCount?: number; // 유저가 신고당한 수
  isAccountGaemaeneo?: boolean; // 개매너 유저인지
  isAccountSuspended?: boolean; // 블락 당한 유저인지
}

export interface Player {
  name: string; // 닉네임
  title: string; // 칭호
  profilePicture: string; // 프로필 사진 Firebase Storage URI String. '' == 끄누투
  level: number; // 현재 레벨
  currentExperience: number; // 현재 경험치
  isAccountgaemaeneo: boolean; // 개매너 유저인지
}

export interface TestingUser {
  name: string;
  level: number;
  win_count: number;
}

export interface Room {
  number: number;
  title: string;
  modes: string[];
  rounds: number;
  limitTime: number;
  currEntry: number;
  maxEntry: number;
  pw: string;
}

export interface FloatingLabelProps {
  type: "text" | "password";
  id: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
}
