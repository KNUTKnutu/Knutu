package knutu.knutu.Service.lib.classes.GameRoom;

import java.util.List;

import knutu.knutu.Service.lib.classes.Player.Player;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {
    private Short       number;     // 방 번호
    private String      title;      // 방제
    private String[]    modes;      // 방 모드들
    private Short       rounds;     // 총 진행할 라운드
    private Short       limitTime;  // 제한 시간
    private Short       currEntry;  // 현재 방에 들어가있는 플레이어 인원 수(current entry)
    private Short       maxEntry;   // 방의 최대 인원 수
    private String      pw;         // 방 비번 => "" = 오픈방
    private List<Player> players;    // 해당 방에 들어와있는 플레이어들
}