type SceneNameType = string;
type LanguageNameType = string;
type UserInformation = string;
type ResponseStatusCode = number;

export const SCENE__INTROSCENE: SceneNameType = "IntroScene";
export const SCENE__LOBBYSCENE: SceneNameType = "LobbyScene";
export const SCENE__GAMESCENE: SceneNameType = "GameScene";

export const LOGO: string = "끄누투 코리아";
export const TITLE: string = "KNUTU";

// IntroScene Constant
export const LOGIN: UserInformation = "로그인";
export const SINGNUP: UserInformation = "회원가입";
export const ID: UserInformation = "아이디";
export const PW: UserInformation = "비밀번호";
export const CONFIRM_PW: UserInformation = "비밀번호 확인";
export const NAME: UserInformation = "닉네임";
export const LOGOUT: UserInformation = "로그아웃";
export const EMAIL: UserInformation = "이메일";

// Preference
export const LANGUAGE__KOREAN: LanguageNameType = "Korean";
export const LANGUAGE__ENGLISH: LanguageNameType = "English";
export const LANGUAGE__DEFAULT: LanguageNameType = LANGUAGE__KOREAN;

// TODO: 몇 개 더 준비
// status codes
export const STATUSCODE__OK: ResponseStatusCode = 200; // 정상 동작
export const STATUSCODE__BAD_REQUEST: ResponseStatusCode = 400; // Request에 잘못된 필드나 이상한 필드가 섞여서 넘어가서 서버에서 수상하다고 Response를 에러로 주는 상황
export const STATUSCODE__UNAUTHORIZED: ResponseStatusCode = 401; // 입력된 정보가 잘못됨
export const STATUSCODE__PAGE_NOT_FOUND: ResponseStatusCode = 404; // 페이지를 찾을 수 없음
export const STATUSCODE__INTERNAL_SERVER_ERROR: ResponseStatusCode = 500; // 서버가 다운된 상태
export const STATUSCODE__BAD_GATEWAY: ResponseStatusCode = 502; // 서버의 프록시 설정이나 리다이렉션, nginx 등이 뭔가 문제가 있어서 Response를 줄라니 배배 꼬여 이상해져서 Response를 아싸리 안 주려고 결정한 상황
