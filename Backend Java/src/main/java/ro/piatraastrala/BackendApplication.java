package ro.piatraastrala;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.piatraastrala.controllers.MissionController;
import ro.piatraastrala.controllers.NonPlayerCharacterController;
import ro.piatraastrala.controllers.PlayerController;
import ro.piatraastrala.entities.Mission;
import ro.piatraastrala.entities.NonPlayerCharacter;
import ro.piatraastrala.entities.Player;

import java.util.ArrayList;

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

	//NPCs


    @RequestMapping(value = "/npc/v1/get", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity getNpcNearby(@RequestParam(value = "lat", required = true) double lat,
                                       @RequestParam(value = "lng", required = true) double lng,
                                       @RequestParam(value = "meters", required = true) int meters
                                      ) {




            return ResponseEntity.status(HttpStatus.OK).body( NonPlayerCharacterController.getNPCsNeaby(lat,lng,meters));




    }



    //Missions


	@RequestMapping(value = "/missions/v1/getfornpc", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity getMissionsForNpc(@RequestParam(value = "npc", required = true) int npc

	) {

		return ResponseEntity.status(HttpStatus.OK).body(MissionController.getMissionsForNpc(npc));

	}

	@RequestMapping(value = "/missions/v1/checkstatus", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity checkMissionStatus(@RequestParam(value = "mission", required = true) int mission,
											 @RequestParam(value = "player", required = true) String playerEmail

	) {

		return ResponseEntity.status(HttpStatus.OK).body(MissionController.getMissionStatus(mission, PlayerController.getIDByEmail(playerEmail)));

	}

	@RequestMapping(value = "/missions/v1/getforplayer", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity getPlayerMissions(@RequestParam(value = "player", required = true) String playerEmail
	) {

		return ResponseEntity.status(HttpStatus.OK).body(MissionController.getUserMissions(PlayerController.getIDByEmail(playerEmail)));

	}

	@RequestMapping(value = "/missions/v1/acceptmission", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
	public ResponseEntity acceptMission(@RequestParam(value = "mission", required = true) int mission,
										@RequestParam(value = "player", required = true) String playerEmail
	) {
		System.out.println(mission + " " + playerEmail);
		MissionController.acceptMissionForPlayer(mission, PlayerController.getIDByEmail(playerEmail));
		return ResponseEntity.status(HttpStatus.OK).body("OK");

	}


}