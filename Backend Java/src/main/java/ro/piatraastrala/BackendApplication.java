package ro.piatraastrala;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.piatraastrala.controllers.PlayerController;
import ro.piatraastrala.entities.Player;

@SpringBootApplication
@RestController
@CrossOrigin
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}



	@RequestMapping("/")
	public String home() {


		return "Piatra Astrala Back End 0.1 is UP! ";


	}

	@RequestMapping("/_ah/health")
	public String healthy() {
		// Message body required though ignored
		return "Still surviving.";
	}



	//PLAYERS

	@RequestMapping(value = "/players/v1/create", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity createPlayer(@RequestParam(value = "email", required = true) String email,
										@RequestParam(value = "password", required = true) String password,
										@RequestParam(value = "city", required = true) String city,
									   @RequestParam(value = "characterName", required = true) String characterName,
									   @RequestParam(value = "phoneNumber", required = true) String phoneNumber,
                                       @RequestParam(value = "chemare", required = true) String calling) {

			Player p = new Player();
			p.setEmail(email);
			p.setPassword(password);
			p.setCity(city);
			p.setCharacterName(characterName);
			p.setPhoneNumber(phoneNumber);
			p.setCalling(calling);

		p.setId(PlayerController.createPlayer(p));
			if (p.getId() > 0) {

				return ResponseEntity.status(HttpStatus.CREATED).body(p);

			} else
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User already exists");


	}

}
