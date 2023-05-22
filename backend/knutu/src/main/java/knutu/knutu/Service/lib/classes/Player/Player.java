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
    private boolean isReady;            // waiting 의 ready, turn ready 등에 두루두루 사용
    private boolean isRoundReady;       // 라운드 진행 준비가 되었는 지(라운드가 끝나면 모두 false로 변경됨)
    private int     score;
}
