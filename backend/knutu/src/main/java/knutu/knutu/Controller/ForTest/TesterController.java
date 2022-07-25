package knutu.knutu.Controller.ForTest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import knutu.knutu.Service.lib.classes.stdictLib.StdictLib;

@RestController
public class TesterController {
    @GetMapping("/testhyj1")
    public String testhyj1(@RequestParam("word") String word) throws Exception {
        return StdictLib.getstdictLibInstance().simpleQuery(word);
    }
}
