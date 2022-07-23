import { roomOption } from "./roomInfoInterface";

export interface roomInfoInterface {
    roomInfo: {
        roomNumber: number;
        roomTitle: string;
        roomOption: roomOption;
        roomRound: number;
        roomLimitTime: number;
        roomEntries: number;
        roomMaxEntry: number;
        roomIsPrivate: boolean;
    }
}