package ro.piatraastrala;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.piatraastrala.controllers.PlayerController;
import ro.piatraastrala.entities.Player;
import ro.piatraastrala.utils.CacheManager;
import ro.piatraastrala.utils.DBSyncJob;

/**
 * This class provides API endpoints for the game. *
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
@SpringBootApplication
@RestController
@CrossOrigin
public class BackendApplication {
    public static boolean jobStarted = false;

    public static void main(String[] args) {
        //Create instance of factory

        SpringApplication.run(BackendApplication.class, args);


    }


    @RequestMapping("/")
    public String home() {


        return "Piatra Astrala Back End 0.1 is UP! ";


    }

    @RequestMapping("/startDBSync")
    public String startDBSync() {
        if (jobStarted) {
            return "Job Already Started";

        } else {
            try {
                Trigger trigger = TriggerBuilder
                        .newTrigger()
                        .withIdentity("DB Sync Trigger", "Sync Group 1")
                        .withSchedule(
                                SimpleScheduleBuilder.simpleSchedule()
                                        .withIntervalInSeconds(60 * 60 * 12).repeatForever())
                        .build();
                JobDetail job = JobBuilder.newJob(DBSyncJob.class)
                        .withIdentity("DB Sync Job", "Sync Group 1").build();
                Scheduler scheduler = new StdSchedulerFactory().getScheduler();
                scheduler.start();
                scheduler.scheduleJob(job, trigger);

            } catch (Exception e) {
                System.out.println("Error starting CRON JOB Refresh Data");

            }
            jobStarted = true;
            return "DB Sync Started";
        }


    }

    @RequestMapping("/_ah/health")
    public String healthy() {
        // Message body required though ignored
        return "Still surviving.";
    }

    @RequestMapping("/mod/forcesync")
    public String forcesync() {
        // Message body required though ignored
        CacheManager.refreshData();
        return "DB Sync Forced.";
    }

    @RequestMapping("/mod/playerlocations/dump")
    public ResponseEntity dumpLocations() {


        return ResponseEntity.status(HttpStatus.OK).body(CacheManager.getAllPlayerLocations());

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
        CacheManager.refreshData();
        if (p.getId() > 0) {

            return ResponseEntity.status(HttpStatus.CREATED).body(p);

        } else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User already exists");


    }


    @RequestMapping(value = "/players/v1/login", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity loginPlayer(@RequestParam(value = "email", required = true) String email,
                                      @RequestParam(value = "password", required = true) String password
    ) {

        // int id = PlayerController.verifyLogin(email, password);
        Player p = CacheManager.verifyLogin(email, password);
        try {
            if (p.getId() > 0) {

                return ResponseEntity.status(HttpStatus.OK).body(p);

            } else
                return ResponseEntity.status(HttpStatus.OK).body(new Player());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(new Player());
        }

    }


    //NPCs


    @RequestMapping(value = "/npc/v1/get", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity getNpcNearby(@RequestParam(value = "lat", required = true) double lat,
                                       @RequestParam(value = "lng", required = true) double lng,
                                       @RequestParam(value = "meters", required = true) int meters,
                                       @RequestParam(value = "playerId", required = true) int playerId
    ) {


        return ResponseEntity.status(HttpStatus.OK).body(CacheManager.getNPCsNeaby(lat, lng, meters, playerId));


    }


    //Lakes

    @RequestMapping(value = "/lakes/v1/get", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity getLakesNearby(@RequestParam(value = "lat", required = true) double lat,
                                         @RequestParam(value = "lng", required = true) double lng,
                                         @RequestParam(value = "meters", required = true) int meters
    ) {


        return ResponseEntity.status(HttpStatus.OK).body(CacheManager.getLakesNearby(lat, lng, meters));


    }

    //Players nearby

    @RequestMapping(value = "/players/v1/getnearby", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity getPlayersNearby(@RequestParam(value = "lat", required = true) double lat,
                                           @RequestParam(value = "lng", required = true) double lng,
                                           @RequestParam(value = "meters", required = true) int meters,
                                           @RequestParam(value = "playerId", required = true) int playerId
    ) {


        return ResponseEntity.status(HttpStatus.OK).body(CacheManager.getPlayersNearby(lat, lng, meters, playerId));


    }


    //Missions


    @RequestMapping(value = "/missions/v1/acceptmission", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity acceptMission(@RequestParam(value = "mission", required = true) int mission,
                                        @RequestParam(value = "player", required = true) String playerEmail
    ) {

        //  MissionController.acceptMissionForPlayer(mission, PlayerController.getIDByEmail(playerEmail));
        return ResponseEntity.status(HttpStatus.OK).body("OK");

    }


    @RequestMapping(value = "/missions/v1/finishmission", method = RequestMethod.POST, produces = "application/json", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity finishMission(@RequestParam(value = "mission", required = true) int mission,
                                        @RequestParam(value = "player", required = true) String playerEmail
    ) {

        // MissionController.finishMissionForPlayer(mission, PlayerController.getIDByEmail(playerEmail));
        return ResponseEntity.status(HttpStatus.OK).body("OK");

    }

}