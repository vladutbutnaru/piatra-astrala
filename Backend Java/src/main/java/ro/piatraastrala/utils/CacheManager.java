package ro.piatraastrala.utils;

import ro.piatraastrala.controllers.BattleTriviaQuestionController;
import ro.piatraastrala.controllers.LakeController;
import ro.piatraastrala.controllers.NonPlayerCharacterController;
import ro.piatraastrala.controllers.PlayerController;
import ro.piatraastrala.entities.*;

import java.util.ArrayList;

/**
 * This class provides local access to all persistent data in the Database
 * along with operations over them.
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class CacheManager {
    private static ArrayList<Mission> allMissions;
    private static ArrayList<Backpack> allBackpacks;
    private static ArrayList<Item> allItems;
    private static ArrayList<Player> allPlayers;
    private static ArrayList<NonPlayerCharacter> allNPC;
    private static ArrayList<Lake> allLakes;
    private static ArrayList<PlayerLocation> allPlayerLocations;
    private static ArrayList<BattleTriviaQuestion> allTriviaQuestions;
    private static ArrayList<BattleTrivia> allBattles;


    public static void refreshData() {
        allPlayers = PlayerController.getAllPlayers();
        allLakes = LakeController.getAllLakes();
        allNPC = NonPlayerCharacterController.getAll();

        allTriviaQuestions = BattleTriviaQuestionController.getAllQuestions();
        allPlayerLocations = new ArrayList<>();
        allBattles = new ArrayList<>();
        for (Player p : allPlayers) {
            PlayerLocation pl = new PlayerLocation(p.getId());
            allPlayerLocations.add(pl);
        }
    }

    public static ArrayList<NonPlayerCharacter> getNPCsNearby(double lat, double lng, int metersClose, int playerId) {
        ArrayList<NonPlayerCharacter> nearby = new ArrayList<>();
        for (NonPlayerCharacter npc : allNPC) {
            if (DistanceUtils.distance(npc.getLat(), npc.getLng(), lat, lng, 'K') < metersClose / 1000.0) {
                nearby.add(npc);
            }

        }
        updatePlayerLocation(playerId, lat, lng);

        return nearby;
    }

    public static ArrayList<Player> getPlayersNearby(double lat, double lng, int metersClose, int playerId) {

        ArrayList<Player> nearby = new ArrayList<>();
        for (PlayerLocation location : allPlayerLocations) {
            if (location.getPlayerId() != playerId && DistanceUtils.distance(location.getLat(), location.getLng(), lat, lng, 'K') < metersClose / 1000.0) {
                nearby.add(getPlayerById(location.getPlayerId()));
            }

        }
        updatePlayerLocation(playerId, lat, lng);

        return nearby;

    }

    public static Player getPlayerById(int playerId) {
        for (Player p : allPlayers) {
            if (p.getId() == playerId)
                return p;

        }
        return null;

    }


    public static void updatePlayerLocation(int playerId, double lat, double lng) {
        System.out.println("Updating location of player with id " + playerId);
        for (PlayerLocation pl : allPlayerLocations) {
            if (pl.getPlayerId() == playerId) {
                pl.setLat(lat);
                pl.setLng(lng);

            }

        }


    }

    public static ArrayList<Lake> getLakesNearby(double lat, double lng, int metersClose) {
        ArrayList<Lake> nearby = new ArrayList<>();
        for (Lake l : allLakes) {
            if (DistanceUtils.distance(l.getLat(), l.getLng(), lat, lng, 'K') < metersClose / 1000.0) {
                nearby.add(l);
            }

        }
        return nearby;
    }

    public static ArrayList<Mission> getAllMissions() {
        return allMissions;
    }

    public static void setAllMissions(ArrayList<Mission> allMissions) {
        CacheManager.allMissions = allMissions;
    }

    public static ArrayList<Backpack> getAllBackpacks() {
        return allBackpacks;
    }

    public static void setAllBackpacks(ArrayList<Backpack> allBackpacks) {
        CacheManager.allBackpacks = allBackpacks;
    }

    public static ArrayList<Item> getAllItems() {
        return allItems;
    }

    public static void setAllItems(ArrayList<Item> allItems) {
        CacheManager.allItems = allItems;
    }

    public static ArrayList<Player> getAllPlayers() {
        return allPlayers;
    }

    public static void setAllPlayers(ArrayList<Player> players) {
        CacheManager.allPlayers = players;
    }


    public static Player verifyLogin(String email, String password) {

        for (Player p : allPlayers) {
            if (p.getEmail().equals(email) && p.getPassword().equals(password))
                return p;


        }
        return null;

    }

    public static int getIdByEmail(String email) {
        for (Player p : allPlayers) {
            if (p.getEmail().equals(email))
                return p.getId();


        }
        return 0;


    }

    public static ArrayList<BattleTrivia> getAllRequestedBattlesForPlayer(int player) {
        ArrayList<BattleTrivia> battlesForPlayer = new ArrayList<>();
        for (BattleTrivia bt : allBattles) {
            if (bt.getPlayer2().getId() == player && !bt.isAccepted() && !bt.isEnded()) {
                battlesForPlayer.add(bt);
            }

        }
        return battlesForPlayer;
    }


    public static ArrayList<NonPlayerCharacter> getAllNPC() {
        return allNPC;
    }

    public static void setAllNPC(ArrayList<NonPlayerCharacter> allNPC) {
        CacheManager.allNPC = allNPC;
    }

    public static ArrayList<Lake> getAllLakes() {
        return allLakes;
    }

    public static void setAllLakes(ArrayList<Lake> allLakes) {
        CacheManager.allLakes = allLakes;
    }

    public static ArrayList<PlayerLocation> getAllPlayerLocations() {
        return allPlayerLocations;
    }

    public static void setAllPlayerLocations(ArrayList<PlayerLocation> allPlayerLocations) {
        CacheManager.allPlayerLocations = allPlayerLocations;
    }

    public static ArrayList<BattleTriviaQuestion> getAllTriviaQuestions() {
        return allTriviaQuestions;
    }

    public static void setAllTriviaQuestions(ArrayList<BattleTriviaQuestion> allTriviaQuestions) {
        CacheManager.allTriviaQuestions = allTriviaQuestions;
    }

    public static ArrayList<BattleTrivia> getAllBattles() {
        return allBattles;
    }

    public static void setAllBattles(ArrayList<BattleTrivia> allBattles) {
        CacheManager.allBattles = allBattles;
    }
}


