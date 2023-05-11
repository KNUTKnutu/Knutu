export enum LOGINSTATE {
  LOGIN = 1,
  SIGNUP,
  FIND,
  PROFILE,
}

export enum SCENESTATE {
  SCENE__INTROSCENE = 0,
  SCENE__LOBBYSCENE,
  SCENE__GAMESCENE,
}

export enum FINDSTATE {
  ID = 1, // 아이디 찾기
  PW, // 비밀번호 찾기
  CHANGEPW, // 비밀번호 바꾸기
  RESULT__FINDID, // 아이디 찾기 결과
  RESULT__CHANGEPW, // 비밀번호 바꾸기 결과
  CONFIRM_AUTH, // 인증번호 확인 창
}