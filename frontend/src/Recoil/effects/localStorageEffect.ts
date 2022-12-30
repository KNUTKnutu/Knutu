/**
 * localStorage와 atom을 연결시키는 함수
 * @param setSelf: 연결된 atom의 값을 초기화 시켜주는 함수
 * @param onSet: 해당하는 atom의 값이 변경되었을 때 실행되는 함수
 */
const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    // key에 저장되어 있는지 먼저 확인
    // const savedValue = localStorage.getItem(key);

    // if (savedValue !== null) {
    //   console.warn(savedValue);
    // }

    // onSet((newValue: any, _: any, isReset: boolean) => {
    //   isReset
    //     ? localStorage.removeItem(key)
    //     : localStorage.setItem(key, JSON.stringify(newValue));
    // });
  };

export default localStorageEffect;
