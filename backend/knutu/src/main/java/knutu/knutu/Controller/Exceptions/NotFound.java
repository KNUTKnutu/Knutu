package knutu.knutu.Controller.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// 404
@ResponseStatus(HttpStatus.NotFound)
public class NotFound extends RuntimeException {
    public NotFound(String message) {
        super(message);
    }
}
