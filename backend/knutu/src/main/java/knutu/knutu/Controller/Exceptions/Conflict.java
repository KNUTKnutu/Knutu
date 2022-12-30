package knutu.knutu.Controller.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// 401
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class Conflict extends RuntimeException {
    public Conflict(String message) {
        super(message);
    }
}
