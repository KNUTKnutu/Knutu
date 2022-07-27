const storageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const localStorageSavedValue = localStorage.getItem(key);
    const sessionStorageSavedValue = sessionStorage.getItem(key);

    if (localStorageSavedValue !== null) {
      setSelf(JSON.parse(localStorageSavedValue));
    }

    if (sessionStorageSavedValue !== null) {
      setSelf(JSON.parse(sessionStorageSavedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
      const isNull: boolean = newValue === null ? true : false;
      isNull
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export default storageEffect;
