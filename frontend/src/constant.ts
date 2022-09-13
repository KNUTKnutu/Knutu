export const FAKEAPI: string = "https://jsonplaceholder.typicode.com/todos/1";

export const SCENE__INTROSCENE: string = "IntroScene";
export const SCENE__LOBBYSCENE: string = "LobbyScene";
export const SCENE__GAMESCENE: string = "GameScene";

export const LOGO = "끄누투 코리아";
export const TITLE = "KNUTU";

// IntroScene Constant
export const LOGIN = "로그인";
export const SINGNUP = "회원가입";
export const ID = "아이디";
export const PW = "비밀번호";
export const CONFIRM_PW = "비밀번호 확인";
export const NAME = "닉네임";
export const LOGOUT = "로그아웃";

// Preference
export const LANGUAGE__KOREAN: string = "Korean";
export const LANGUAGE__ENGLISH: string = "English";
export const LANGUAGE__DEFAULT: string = LANGUAGE__KOREAN;

// TODO: 몇 개 더 준비
// status codes
export const STATUSCODE__OK: number = 200;                  // 정상 동작
export const STATUSCODE__BAD_REQUEST: number = 400;         // Request에 잘못된 필드나 이상한 필드가 섞여서 넘어가서 서버에서 수상하다고 Response를 에러로 주는 상황
export const STATUSCODE__UNAUTHORIZED: number = 401;        // 입력된 정보가 잘못됨
export const STATUSCODE__PAGE_NOT_FOUND: number = 404;      // 페이지를 찾을 수 없음
export const STATUSCODE__INTERNAL_SERVER_ERROR: number = 500;   // 서버가 다운된 상태
export const STATUSCODE__BAD_GATEWAY: number = 502;         // 서버의 프록시 설정이나 리다이렉션, nginx 등이 뭔가 문제가 있어서 Response를 줄라니 배배 꼬여 이상해져서 Response를 아싸리 안 주려고 결정한 상황