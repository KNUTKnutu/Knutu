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
    private Short       number;     // 방 번호
    private String      title;      // 방제
    private String      lang;       // 언어
    private String      mode;      // 방 모드들
    private Short       rounds;     // 총 진행할 라운드
    private Short       limitTime;  // 제한 시간
    private Short       currEntry;  // 현재 방에 들어가있는 플레이어 인원 수(current entry)
    private Short       maxEntry;   // 방의 최대 인원 수
    private String      pw;         // 방 비번 => "" = 오픈방
    private List<Player> players;    // 해당 방에 들어와있는 플레이어들
    private Short       currRound;  // 게임 중인 방에서, 현재 라운드
    private String      roundWord;  // 게임 중인 방에서, 현재 설정된 라운드 워드(각 라운드마다의 시작 단어를 나타내는 단어)
    private String      currWord;   // 게임 중인 방에서, 가장 최근에 게임 씬에 입력된 단어
    private String      startWord;  // 게임 중인 방에서, 현재 턴에 입력해야 할 첫 글자
    private Short       turn;       // 현재 단어를 입력할 플레이어가 몇 번째 플레이어인지에 대한 배열 인덱스
    private Float       remainTime; // 1000 = 1초, 라운드 중 남은 시간
    private Float       turnRemainTime; // 자기 차례에 남은 시간
    private Collection<Chat>    chats;  // 이 방 안에서 오고간 채팅의 모음      
    private Float       expireTimeToken;    // 라운드가 시작 되거나, 단어가 입력되어 정답으로 간주되었을 때, 이 time token을 타임스탬프(epoch millisec)로 지속적 갱신. 이 타임 토큰을 체크하여, 라운드 종료를 판단한다.
}