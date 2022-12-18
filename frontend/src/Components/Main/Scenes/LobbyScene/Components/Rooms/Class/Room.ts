import { roomOption } from "../Interface/roomInfoInterface";

export class RoomClass {
    public static getRoomNumberString = (roomNumber: number): string => {
        if(roomNumber >= 100) return `${roomNumber}`;
        if(roomNumber >= 10) return `0${roomNumber}`;
        return `00${roomNumber}`;
    }
    
    public static getRoomOptionString = (roomOption: string, roomLang: string): string => {
        let lang, option;
        
        switch(roomLang) {
            case "kor":
                lang = "한국어";
                break;
            case "eng":
                lang = "영어";
                break;
        }

        switch(roomOption) {
            case "start":
                option = "앞말잇기";
                break;
            case "end":
                option = "끝말잇기";
                break;
            case "323":
                option = "3-2-3";
                break;
            case "43234":
                option = "4-3-2-3-4";
                break;
        }

        return `${lang} ${option}`;
    }
    
    public static getRoomRoundString = (roomRound: number, roomLimitTime: number): string => {
        return `라운드 ${roomRound} ${roomLimitTime}초`;
    }

    public static getRoomIsPrivateString = (password: string) => {
        return password.length != 0 ? "자물쇠" : "오픈방";
    }

    public static getRoomIsFull = (roomEntries: number, roomMaxEntry: number) => {
        return roomEntries === roomMaxEntry ? "풀방" : "";
    }

    public static getRoomEntryString = (roomEntries: number, roomMaxEntry: number) => {
        return `${roomEntries} / ${roomMaxEntry}`;
    }
}