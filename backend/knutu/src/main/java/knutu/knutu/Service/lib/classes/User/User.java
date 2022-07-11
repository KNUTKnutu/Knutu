package knutu.knutu.Service.lib.classes.User;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private String pw;
    private String name;
    private Preference preference;  // Service/lib/classes/User/Preference.java
    private Timestamp created_time;
    private Timestamp updated_time;
    private int reportedCount;
    private boolean isAccountSuspended;
}