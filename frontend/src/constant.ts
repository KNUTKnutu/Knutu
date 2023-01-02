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
export const CHANGE_PW: UserInformation = "비밀번호 재설정";
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
export const STATUSCODE__FORBIDDEN: ResponseStatusCode = 403; // 리소스에 대한 권한 부족
export const STATUSCODE__PAGE_NOT_FOUND: ResponseStatusCode = 404; // 페이지를 찾을 수 없음
export const STATUSCODE__METHOD_NOT_ALLOWED: ResponseStatusCode = 405; // 허가 되지 않은 방식의 요청
export const STATUSCODE__REQUEST_TIMEOUT: ResponseStatusCode = 408; // 요청 대기시간이 지난 상태
export const STATUSCODE__CONFLICT: ResponseStatusCode = 409; // 이미 로그인 중인 계정에 로그인을 시도하는 등
export const STATUSCODE__INTERNAL_SERVER_ERROR: ResponseStatusCode = 500; // 서버가 다운된 상태
export const STATUSCODE__BAD_GATEWAY: ResponseStatusCode = 502; // 서버의 프록시 설정이나 리다이렉션, nginx 등이 뭔가 문제가 있어서 Response를 줄라니 배배 꼬여 이상해져서 Response를 아싸리 안 주려고 결정한 상황
export const STATUSCODE__SERVICE_UNAVAILABLE: ResponseStatusCode = 503; // 서비스가 이용 불가능함
export const STATUSCODE__LOOP_DETECTED: ResponseStatusCode = 508; // 서버가 요청을 처리할 때 무한 루프 감지

// MAKE ROOM
export const MAXIMUM = [2, 3, 4, 5, 6, 7, 8];
export const LIMITTIME = [15, 30, 45, 60, 90, 120];
export const ROUNDS = [2, 3, 4, 5, 6, 7, 8, 9];
export const LANGUAGE = [
  { id: "kor", label: "한국어" },
  { id: "eng", label: "English" },
];
export const GAMEMODE = [
  { id: "end", label: "끝말잇기" },
  { id: "start", label: "앞말잇기" },
  { id: "323", label: "3-2-3" },
  { id: "43234", label: "4-3-2-3-4" },
];
export const SPECIALMODE = [
  { id: "manner", label: "매너" },
  { id: "injeong", label: "어인정" },
  { id: "knut", label: "교통대" },
];
