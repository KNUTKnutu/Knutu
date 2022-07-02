package knutu.knutu;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@RestController
public class KnutuApplication {

	public static void main(String[] args) {
		SpringApplication.run(KnutuApplication.class, args);
	}

	@GetMapping("/Hi")
	public String hello(@RequestParam(value = "name", defaultValue = "leejong") String name) {
		String response = String.format("Hello %s", name);
		return response;
	}

}
