package knutu.knutu.Service.lib.classes.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Preference {
    private String  language;           // 설정한 언어. 기본값 => Korean
    private boolean isAccountDisabled;  // 유저의 요청에 따른 계정 비활성화 여부
    private float   masterVolume;       // 유저가 설정한 마스터 볼륨값

    public static final String LANGUAGE__KOREAN = "Korean";
    public static final String LANGUAGE__ENGLISH = "English";
    public static final String LANGUAGE__DEFAULT = LANGUAGE__KOREAN;
}
