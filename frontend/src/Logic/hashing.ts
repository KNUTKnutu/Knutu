import sha256 from "js-sha256";

const hashing = (pw: string) => {
  return sha256.sha256(pw);
};

export default hashing;
