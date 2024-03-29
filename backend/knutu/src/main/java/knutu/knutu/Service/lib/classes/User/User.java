package knutu.knutu.Service.lib.classes.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String      id;                 // 아디
    private String      pw;                 // 비번
    private String      name;               // 닉네임
    private String      email;              // 이메일 주소
    private String      title;              // 칭호
    private String      profilePicture;     // 프로필 사진 Firebase Storage URI String. "" == 끄누투
    private Preference  preference;         // 개인 환경 설정 => Service/lib/classes/User/Preference.java
    private int         level;              // 현재 레벨
    private double      currentExperience;  // 현재 경험치
    private double      totalExperience;    // 총 누적 경험치. User Validation 위함
    private double      remainExperience;   // 레벨업을 위해 남은 경험치. User Validation 위함
    private int         reputation;         // 유저 칭찬점수(평판)
    private long        created_time;       // 유저 생성일자 timestamp
    private long        updated_time;       // 유저가 마지막으로 업데이트 된 시점 timestamp
    private int         reportedCount;      // 유저가 신고당한 수
    private boolean     isAccountGaemaeneo; // 개매너 유저인지
    private boolean     isAccountSuspended; // 블락 당한 유저인지
    private boolean     isInGame;           // 방에 들어가있는 상태인지
}