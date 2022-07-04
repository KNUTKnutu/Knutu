// 데이터를 fetch

import wrapPromise from "./wrapPromise";

// fetch 완료되기 전에는 Suspense(Splash)를 보여준다.
export default () => {
  // 각 Scene마다 fetch 할 로직을 적어주면 됨.
  const introPromise = fetchIntro();
  return {
    intro: wrapPromise(introPromise),
  };
};

// 이 부분에 fetch logic 짜면됨. 아니면 Logic 폴더에 짜면 됨.
const fetchIntro = () => {
  console.log("fetch...");
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fetched...");
      resolve({
        title: "Ringo Starr",
      });
    }, 2000);
  });
};
