package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Item;
import ro.piatraastrala.entities.Player;
import ro.piatraastrala.entities.PlayerStats;
import ro.piatraastrala.utils.DBConnection;
import ro.piatraastrala.utils.PlayerStatsFactory;

import java.sql.*;
import java.util.ArrayList;

/**
 * This class provides SQL support for handling players
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class PlayerController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();


    public static ArrayList<Player> getAllPlayers() {
        ArrayList<Player> players = new ArrayList<Player>();


        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Players");


            rs = stmt.executeQuery();

            while (rs.next()) {
                Player p = new Player();
                p.setId(rs.getInt(1));
                p.setCalling(rs.getString(7));
                p.setCharacterName(rs.getString(5));
                p.setMissions(MissionController.getUserMissions(p.getId()));
                p.setEmail(rs.getString(3));
                p.setPassword(rs.getString(2));
                p.setPlayerStats(getPlayerStats(p.getId()));
                p = getPlayerEquippedItems(p);
                p.setMissions(MissionController.getUserMissions(p.getId()));

                players.add(p);
                System.out.println("Found player with id " + p.getId());

            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return players;


    }

    public static Player getPlayerEquippedItems(Player player) {
        try {
            PreparedStatement stmt;
            ResultSet rs;
            stmt = conn.prepareStatement("SELECT * FROM Player_Equipped WHERE ID_Player = ?");
            stmt.setInt(1, player.getId());


            rs = stmt.executeQuery();

            while (rs.next()) {
                //weapon
                if (rs.getInt(4) == 1) {
                    Item weaponEquipped = ItemController.getById(rs.getInt(3));
                    weaponEquipped.setCurrentDurability(rs.getInt(5));
                    weaponEquipped.setDiamonds(rs.getString(6));
                    player.setWeapon(weaponEquipped);
                    System.out.println("Found weapon " + weaponEquipped.getName());
                    continue;
                }
                //hand accessory

                if (rs.getInt(4) == 2) {
                    Item handAccessoryEquipped = ItemController.getById(rs.getInt(3));
                    handAccessoryEquipped.setCurrentDurability(rs.getInt(5));
                    handAccessoryEquipped.setDiamonds(rs.getString(6));
                    player.getHandAccessories().add(handAccessoryEquipped);
                    System.out.println("Found hand accessory " + handAccessoryEquipped.getName());
                    continue;

                }

                //helmet

                if (rs.getInt(4) == 3) {
                    Item helmetEquipped = ItemController.getById(rs.getInt(3));
                    helmetEquipped.setCurrentDurability(rs.getInt(5));
                    helmetEquipped.setDiamonds(rs.getString(6));
                    player.setHelmet(helmetEquipped);
                    System.out.println("Found helmet " + helmetEquipped.getName());
                    continue;
                }

                //neck

                if (rs.getInt(4) == 4) {
                    Item neckEquipped = ItemController.getById(rs.getInt(3));
                    neckEquipped.setCurrentDurability(rs.getInt(5));
                    neckEquipped.setDiamonds(rs.getString(6));
                    player.setNeck(neckEquipped);
                    continue;
                }

                //feet
                if (rs.getInt(4) == 5) {
                    Item feetArmor = ItemController.getById(rs.getInt(3));
                    feetArmor.setCurrentDurability(rs.getInt(5));
                    feetArmor.setDiamonds(rs.getString(6));
                    player.setFeet(feetArmor);
                    continue;
                }

                //chest
                if (rs.getInt(4) == 6) {
                    Item chestArmor = ItemController.getById(rs.getInt(3));
                    chestArmor.setCurrentDurability(rs.getInt(5));
                    chestArmor.setDiamonds(rs.getString(6));
                    player.setChest(chestArmor);
                    continue;
                }

                //pants
                if (rs.getInt(4) == 7) {
                    Item pantsArmor = ItemController.getById(rs.getInt(3));
                    pantsArmor.setCurrentDurability(rs.getInt(5));
                    pantsArmor.setDiamonds(rs.getString(6));
                    player.setPants(pantsArmor);
                    continue;
                }

                //shield
                if (rs.getInt(4) == 8) {
                    Item shield = ItemController.getById(rs.getInt(3));
                    shield.setCurrentDurability(rs.getInt(5));
                    shield.setDiamonds(rs.getString(6));
                    player.setShield(shield);
                    continue;
                }

            }

            player.setBackpack(BackpackController.getPlayerBackpack(player.getId()));
        } catch (Exception e) {
            logger.error(e.getMessage());

        }

        return player;

    }

    public static int createPlayer(Player p) {

        PreparedStatement stmt;
        ResultSet rs;
        int newId = -1;
        try {

            stmt = conn.prepareStatement("INSERT INTO Players(Pass_Word,Email,City,Character_Name,Phone_Number, Calling) VALUES(?,?,?,?,?,?)", Statement.RETURN_GENERATED_KEYS);
            stmt.setString(1, p.getPassword());
            stmt.setString(2, p.getEmail());
            stmt.setString(3, p.getCity());
            stmt.setString(4, p.getCharacterName());
            stmt.setString(5, p.getPhoneNumber());
            stmt.setString(6, p.getCalling());
            stmt.executeUpdate();
            rs = stmt.getGeneratedKeys();
            rs.next();
            newId = rs.getInt(1);

            stmt = conn.prepareStatement("INSERT INTO Player_Stats(ID_Player, Strength, Intelligence, Agility, Fatigue, Fatigue_Regen, Spirit, Max_Health, Max_Mana, Current_Health, Current_Mana, Health_Regen, Mana_Regen, Experience, Level, Hunger, Hunger_Regen, Influence, Fatigue_Update_Date)" +
                    " VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, NOW())");


            PlayerStats stats = new PlayerStats();

            if (p.getCalling().equals("agricultor"))
                stats = PlayerStatsFactory.getNewFarmerPlayerStats(newId);
            if (p.getCalling().equals("luptator"))
                stats = PlayerStatsFactory.getNewWarriorPlayerStats(newId);
            if (p.getCalling().equals("explorator"))
                stats = PlayerStatsFactory.getNewExplorerPlayerStats(newId);
            if (p.getCalling().equals("alchemist"))
                stats = PlayerStatsFactory.getNewAlchemistPlayerStats(newId);

            stmt.setInt(1, stats.getIdPlayer());
            stmt.setDouble(2, stats.getStrength());
            stmt.setDouble(3, stats.getIntelligence());
            stmt.setDouble(4, stats.getAgility());
            stmt.setDouble(5, stats.getFatigue());
            stmt.setDouble(6, stats.getFatigueRegen());
            stmt.setDouble(7, stats.getSpirit());
            stmt.setDouble(8, stats.getMaxHealth());
            stmt.setDouble(9, stats.getMaxChakra());
            stmt.setDouble(10, stats.getCurrentHealth());
            stmt.setDouble(11, stats.getCurrentChakra());
            stmt.setDouble(12, stats.getHealthRegen());
            stmt.setDouble(13, stats.getChakraRegen());
            stmt.setInt(14, stats.getExperience());
            stmt.setInt(15, stats.getLevel());
            stmt.setInt(16, stats.getHunger());
            stmt.setInt(17, stats.getHungerRegen());
            stmt.setInt(18, stats.getInfluence());
            stmt.executeUpdate();


        } catch (SQLException ex) {
            // handle any errors
            System.out.println(ex.getMessage());
            logger.error(ex.getMessage());

        }

        return newId;


    }


    public static Player getById(int id) {
        PreparedStatement stmt;
        ResultSet rs;
        Player p = new Player();
        try {
            stmt = conn.prepareStatement("SELECT * FROM Players WHERE ID = ?");
            stmt.setInt(1, id);

            rs = stmt.executeQuery();

            if (rs.next()) {
                p.setId(rs.getInt(1));
                p.setCalling(rs.getString(7));
                p.setCharacterName(rs.getString(5));
                p.setMissions(MissionController.getUserMissions(p.getId()));
                p.setEmail(rs.getString(3));
                p.setPassword(rs.getString(2));
                p.setPlayerStats(getPlayerStats(p.getId()));
                p = getPlayerEquippedItems(p);
                p.setMissions(MissionController.getUserMissions(p.getId()));
            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return p;


    }


    public static PlayerStats getPlayerStats(int playerId) {
        PlayerStats ps = new PlayerStats();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Player_Stats WHERE ID_Player = ?");
            stmt.setInt(1, playerId);


            rs = stmt.executeQuery();

            if (rs.next()) {
                ps.setId(rs.getInt(1));
                ps.setIdPlayer(rs.getInt(2));
                ps.setStrength(rs.getDouble(3));
                ps.setIntelligence(rs.getDouble(4));
                ps.setAgility(rs.getDouble(5));
                ps.setFatigue(rs.getDouble(6));
                ps.setFatigueRegen(rs.getDouble(7));
                ps.setSpirit(rs.getDouble(8));
                ps.setMaxHealth(rs.getDouble(9));
                ps.setMaxChakra(rs.getDouble(10));
                ps.setCurrentHealth(rs.getDouble(11));
                ps.setCurrentChakra(rs.getDouble(12));
                ps.setHealthRegen(rs.getDouble(13));
                ps.setChakraRegen(rs.getDouble(14));
                ps.setExperience(rs.getInt(15));
                ps.setLevel(rs.getInt(16));
                ps.setHunger(rs.getInt(17));
                ps.setHungerRegen(rs.getInt(18));
                ps.setInfluence(rs.getInt(19));

                ps.setFatigueUpdateDate(rs.getTimestamp(20));

            }


        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return ps;


    }


}
