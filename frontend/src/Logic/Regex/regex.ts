// ID
// 1. 4자 이상 12자 이하
// 2. 영문자 대소문자 가능, 숫자 가능, 특수문자 불가능, 한글 불가능
export const RegexId: RegExp = /^[a-z0-9]{4,12}$/gi;

// PW
// 1. 8자 이상 20자 이하
// 2. 영문자 대소문자 가능, 숫자와 특수문자 1개 이상 사용, 한글 불가능
// 허강민 TODO, RegEx 잘못됨. Validation 옳지 않으며, 글자수도 8~20인데 6,20 으로 들어감.
export const RegexPw: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{6,20}$/;

// 닉네임
// 1. 2자 이상 10자 이하
// 2. 한글 가능, 영어 대소문자 가능, 숫자 가능, 특수문자 불가능
export const RegexName: RegExp = /^[a-zA-Z가-힣0-9]{2,10}$/gi;
