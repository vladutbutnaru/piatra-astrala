package ro.piatraastrala.utils;

import ro.piatraastrala.entities.PlayerStats;

/**
 * This class provides quick preparation of player stats.
 * On registration, depending on the player class, a PlayerStat
 * Is prepared and returned *
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class PlayerStatsFactory {

    public static PlayerStats getNewFarmerPlayerStats(int idPlayer) {
        PlayerStats stats = new PlayerStats();
        stats.setIdPlayer(idPlayer);
        stats.setStrength(3);
        stats.setIntelligence(2);
        stats.setAgility(5);
        stats.setFatigue(100);
        stats.setFatigueRegen(20);
        stats.setSpirit(1);
        stats.setMaxHealth(100);
        stats.setMaxChakra(40);
        stats.setCurrentChakra(40);
        stats.setCurrentHealth(100);
        stats.setHealthRegen(20);
        stats.setChakraRegen(5);
        stats.setExperience(0);
        stats.setLevel(1);
        stats.setHunger(100);
        stats.setHungerRegen(100);
        stats.setInfluence(0);
        return stats;


    }

    public static PlayerStats getNewWarriorPlayerStats(int idPlayer) {
        PlayerStats stats = new PlayerStats();
        stats.setIdPlayer(idPlayer);
        stats.setStrength(8);
        stats.setIntelligence(2);
        stats.setAgility(4);
        stats.setFatigue(100);
        stats.setFatigueRegen(15);
        stats.setSpirit(2);
        stats.setMaxHealth(120);
        stats.setMaxChakra(45);
        stats.setCurrentChakra(45);
        stats.setCurrentHealth(120);
        stats.setHealthRegen(25);
        stats.setChakraRegen(4);
        stats.setExperience(0);
        stats.setLevel(1);
        stats.setHunger(100);
        stats.setHungerRegen(100);
        stats.setInfluence(0);
        return stats;

    }

    public static PlayerStats getNewExplorerPlayerStats(int idPlayer) {
        PlayerStats stats = new PlayerStats();
        stats.setIdPlayer(idPlayer);
        stats.setStrength(2);
        stats.setIntelligence(4);
        stats.setAgility(7);
        stats.setFatigue(100);
        stats.setFatigueRegen(21);
        stats.setSpirit(3);
        stats.setMaxHealth(90);
        stats.setMaxChakra(34);
        stats.setCurrentChakra(34);
        stats.setCurrentHealth(90);
        stats.setHealthRegen(14);
        stats.setChakraRegen(2);
        stats.setExperience(0);
        stats.setLevel(1);
        stats.setHunger(100);
        stats.setHungerRegen(100);
        stats.setInfluence(0);
        return stats;

    }

    public static PlayerStats getNewAlchemistPlayerStats(int idPlayer) {
        PlayerStats stats = new PlayerStats();
        stats.setIdPlayer(idPlayer);
        stats.setStrength(4);
        stats.setIntelligence(7);
        stats.setAgility(2);
        stats.setFatigue(100);
        stats.setFatigueRegen(16);
        stats.setSpirit(8);
        stats.setMaxHealth(90);
        stats.setMaxChakra(60);
        stats.setCurrentChakra(60);
        stats.setCurrentHealth(90);
        stats.setHealthRegen(15);
        stats.setChakraRegen(10);
        stats.setExperience(0);
        stats.setLevel(1);
        stats.setHunger(100);
        stats.setHungerRegen(100);
        stats.setInfluence(0);
        return stats;

    }
}
