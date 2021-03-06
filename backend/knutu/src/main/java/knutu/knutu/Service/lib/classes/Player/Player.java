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
    private long    currentExperience;  // 현재 경험치
    private boolean isAccountgaemaeneo; // 개매너 유저인지
}
