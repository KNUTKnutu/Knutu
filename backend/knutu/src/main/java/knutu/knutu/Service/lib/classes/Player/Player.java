package knutu.knutu.Service.lib.classes.Player;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Player {
    private String  name;               // 닉네임
    private String  title;              // 칭호
    private String  profileFicture;     // 프로필 사진 Firebase Storage URI String. "" == 끄누투
    private int     level;              // 현재 레벨
    private double  currentExperience;  // 현재 경험치
    private boolean isAccountgaemaeneo; // 개매너 유저인지
    private boolean isGameReady;        // GameScene waiting 의 ready 상태
    private boolean isRoundReady;       // 라운드 진행 준비가 되었는 지
    private boolean isRoundStartReady;  // 라운드 진행 준비 재확인.(이게 모두 ready가 되면 본인 턴에서 입력이 가능한 상태로 바뀜)
    private boolean isTurnChangeReady;  // 턴 바꿀 준비
    private int     score;              // 현재 플레이어 점수
}
