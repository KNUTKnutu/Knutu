export class OnlineUserClass {
    public static getUserCountString = (userCount: number): string => {
        const channel = "K"; // 이후 Atom에서 받아와 채널 이름을 넣도록 작업해야 함
        return `${channel} 채널 접속자 수: ${userCount}명`;
    }

    public static getUserLevelString = (userLevel: number): string => {
        return `Lv ${userLevel}`;
    }
}