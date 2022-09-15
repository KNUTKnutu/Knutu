const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export default localStorageEffect;

/**
 * setSelf: 연결된 atom의 값을 초기화 시켜주는 함수
 * onSet: 해당하는 atom의 값이 변경되었을 때 실행되는 함수
 */
