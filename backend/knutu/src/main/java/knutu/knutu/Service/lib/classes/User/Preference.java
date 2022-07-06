package knutu.knutu.Service.lib.classes.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Preference {
    private String language;

    public static final String LANGUAGE__KOREAN = "Korean";
    public static final String LANGUAGE__ENGLISH = "English";
    public static final String LANGUAGE__DEFAULT = LANGUAGE__KOREAN;
}
