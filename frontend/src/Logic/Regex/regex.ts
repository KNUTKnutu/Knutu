// ID
// 1. 4자 이상 12자 이하
// 2. 영문자 소문자 가능, 숫자 가능, 특수문자 불가능, 한글 불가능
export const RegexId: RegExp = /^[a-z0-9]{4,12}$/gi;

// PW
// 1. 8자 이상 20자 이하
// 2. 영문자 대소문자 가능, 문자와 숫자와 특수문자 1개 이상 사용, 한글 불가능
export const RegexPw: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%&*?])[A-Za-z\d@!@#$%&*?]{8,20}$/;

// 닉네임
// 1. 2자 이상 10자 이하
// 2. 한글 가능, 영어 대소문자 가능, 숫자 가능, 특수문자 불가능
export const RegexName: RegExp = /^(?=.*[a-zA-Z\dㄱ-ㅎㅏ-ㅣ가-힣])[A-Za-z\dㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/gi;

// 이메일
// 
export const RegexEmail: RegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
