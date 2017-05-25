package ro.piatraastrala.utils;

import ro.piatraastrala.controllers.PlayerController;
import ro.piatraastrala.entities.Backpack;
import ro.piatraastrala.entities.Item;
import ro.piatraastrala.entities.Mission;
import ro.piatraastrala.entities.Player;

import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/25/2017.
 */
public class CacheManager {
    private static ArrayList<Mission> allMissions;
    private static ArrayList<Backpack> allBackpacks;
    private static ArrayList<Item> allItems;
    private static ArrayList<Player> players;

    public static void refreshData(){









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

    public static ArrayList<Player> getPlayers() {
        return players;
    }

    public static void setPlayers(ArrayList<Player> players) {
        CacheManager.players = players;
    }
}
