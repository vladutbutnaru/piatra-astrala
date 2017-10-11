package ro.piatraastrala.utils;

import ro.piatraastrala.controllers.LakeController;
import ro.piatraastrala.controllers.NonPlayerCharacterController;
import ro.piatraastrala.controllers.PlayerController;
import ro.piatraastrala.entities.*;

import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/25/2017.
 */
public class CacheManager {
    private static ArrayList<Mission> allMissions;
    private static ArrayList<Backpack> allBackpacks;
    private static ArrayList<Item> allItems;
    private static ArrayList<Player> allPlayers;
    private static ArrayList<NonPlayerCharacter> allNPC;
    private static ArrayList<Lake> allLakes;


    public static void refreshData(){
        allPlayers = PlayerController.getAllPlayers();
        allLakes = LakeController.getAllLakes();
        allNPC = NonPlayerCharacterController.getAll();

    }

    public static ArrayList<NonPlayerCharacter> getNPCsNeaby(double lat, double lng, int metersClose) {
        ArrayList<NonPlayerCharacter> nearby = new ArrayList<>();
        for (NonPlayerCharacter npc : allNPC) {
            if (DistanceUtils.distance(npc.getLat(), npc.getLng(), lat, lng, 'K') < metersClose / 1000.0) {
                nearby.add(npc);
            }

        }
        return nearby;
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


    public static Player verifyLogin(String email, String password){

        for(Player p : allPlayers){
            if(p.getEmail().equals(email) && p.getPassword().equals(password))
                return p;


        }
        return null;

    }






}


