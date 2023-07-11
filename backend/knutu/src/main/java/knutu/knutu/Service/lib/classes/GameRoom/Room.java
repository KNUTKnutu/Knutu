package knutu.knutu.Service.lib.classes.GameRoom;

import java.util.Collection;
import java.util.List;

import knutu.knutu.Service.lib.classes.Chat.Chat;
import knutu.knutu.Service.lib.classes.Player.Player;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Room {
    private int         number;     // 방 번호
    private String      title;      // 방제
    private String      lang;       // 언어
    private String      mode;      // 방 모드들
    private int         rounds;     // 총 진행할 라운드
    private int         limitTime;  // 제한 시간
    private int         originLimitTime;    // 원래 제한 시간
    private int         currEntry;  // 현재 방에 들어가있는 플레이어 인원 수(current entry)
    private int         maxEntry;   // 방의 최대 인원 수
    private String      pw;         // 방 비번 => "" = 오픈방
    private List<Player> players;    // 해당 방에 들어와있는 플레이어들
    private String      roundWord;  // 게임 중인 방에서, 현재 설정된 라운드 워드(각 라운드마다의 시작 단어를 나타내는 단어)
    private String      currWord;   // 게임 중인 방 내에서 가장 최근에 게임 씬에 입력된 단어
    private Collection<Chat>    chats;  // 이 방 안에서 오고간 채팅의 모음      
    private int         currRound;  // 현재 라운드
    private String      currTurn;   // 현재 누구의 차례인지
    private boolean     isGaming;   // 게임이 진행 중인지
    private int         remainRoundTime;    // 라운드 남은 시간
}