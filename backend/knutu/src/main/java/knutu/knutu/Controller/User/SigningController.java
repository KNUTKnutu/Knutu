package knutu.knutu.Controller.User;

import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Controller.Exceptions.Conflict;
import knutu.knutu.Controller.Exceptions.Unauthorized;
import knutu.knutu.Logic.WebSocket.LobbyScene.LobbySceneService;
import knutu.knutu.Service.FirebaseService;
import knutu.knutu.Service.lib.classes.User.User;

import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class SigningController {

    @GetMapping("/signin")
    public User signIn(@RequestParam("id") String id, @RequestParam("pw") String pw) throws Exception {
        User user = FirebaseService.getFirebaseInstance().getUserForLogin(id, pw);
        
        if(user == null) {
            // 황여진 TODO: 아래 Unauthorized 메소드와 같이, 특정 상황의 에러에 맞는 Status Code와 Response를 설정하여 Return할 수 있도록 추가적으로 메소드 구비 및 마련(../Exceptions/ 내 작업)
            // 400, 404, 500, 502
            throw new Unauthorized("Wrong user information given.");
        }

        if(LobbySceneService.getInstance().isUserLoggedIn(user.getName())) {
            throw new Conflict("This User Has Already Logged In.");
        }

        return user;
    }

    @PostMapping("/signup")
    public boolean signUp(@RequestBody User user) throws Exception {
        return FirebaseService.getFirebaseInstance().addUser(user);
    }

    @PutMapping("/logout")
    public boolean logOut(@RequestParam String userName) throws Exception {
        return LobbySceneService.getInstance().logOut(userName);
    }
}