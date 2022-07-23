import { roomOption } from "../Interface/roomInfoInterface";

export class RoomClass {
    public static getRoomNumberString = (roomNumber: number): string => {
        if(roomNumber >= 100) return `${roomNumber}`;
        if(roomNumber >= 10) return `0${roomNumber}`;
        return `00${roomNumber}`;
    }
    
    public static getRoomOptionString = (roomOption: roomOption): string => {

        const {majorMode, additionalAllowedMode} = roomOption;

        if (additionalAllowedMode)
            return `${majorMode} / ${additionalAllowedMode}`;

        return majorMode;
    }
    
    public static getRoomRoundString = (roomRound: number, roomLimitTime: number): string => {
        return `라운드 ${roomRound} ${roomLimitTime}초`;
    }

    public static getRoomIsPrivateString = (roomIsPrivate: boolean) => {
        return roomIsPrivate ? "자물쇠" : "오픈방";
    }

    public static getRoomIsFull = (roomEntries: number, roomMaxEntry: number) => {
        return roomEntries === roomMaxEntry ? "풀방" : "";
    }
}