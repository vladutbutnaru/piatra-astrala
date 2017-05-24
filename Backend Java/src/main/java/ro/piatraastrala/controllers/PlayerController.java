package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.*;
import ro.piatraastrala.utils.DBConnection;
import ro.piatraastrala.utils.PlayerStatsFactory;

import java.sql.*;

/**
 * Created by Vlad Butnaru on 5/16/2017.
 */
public class PlayerController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();


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

            logger.error(ex.getMessage());

        }

        return newId;


    }

    public static int getIDByEmail(String email) {
        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT ID FROM Players WHERE Email = ?");
            stmt.setString(1, email);

            rs = stmt.executeQuery();

            while (rs.next()) {
                return rs.getInt(1);


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return 0;


    }

    public static Player getById(int id){
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


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return p;


    }

    public static int verifyLogin(String email, String password) {
        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT ID FROM Players WHERE Email = ? AND Pass_Word = ?");
            stmt.setString(1, email);
            stmt.setString(2, password);

            rs = stmt.executeQuery();

            if (rs.next()) {
                return rs.getInt(1);

            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return 0;


    }

    public static PlayerStats getPlayerStats(int playerId){
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

              Player p = getById(playerId);
              ps.setCalling(p.getCalling());
              ps.setCharacterName(p.getCharacterName());
              ps.setPlayer(p);



            }
            stmt = conn.prepareStatement("SELECT * FROM Player_Equipped WHERE ID_Player = ?");
            stmt.setInt(1, playerId);


            rs = stmt.executeQuery();

            while (rs.next()){
                //weapon
            if(rs.getInt(4)==1){
                Weapon weaponEquipped = WeaponController.getById(rs.getInt(3));
                weaponEquipped.setCurrentDurability(rs.getInt(5));
                weaponEquipped.setDiamonds(rs.getString(6));
                ps.getPlayer().setWeapon(weaponEquipped);

            }
            //hand accessory

                if(rs.getInt(4)==2){
                    HandAccessory handAccessoryEquipped = HandAccessoryController.getById(rs.getInt(3));

                    handAccessoryEquipped.setDiamonds(rs.getString(6));
                    ps.getPlayer().getHandAccessories().add(handAccessoryEquipped);

                }

                //helmet

                if(rs.getInt(4)==3){
                    Helmet helmetEquipped = HelmetController.getById(rs.getInt(3));

                    helmetEquipped.setDiamonds(rs.getString(6));
                    ps.getPlayer().setHelmet(helmetEquipped);

                }

                //neck

                if(rs.getInt(4)==4){
                    NeckAccessory neckEquipped = NeckAccessoryController.getById(rs.getInt(3));

                    neckEquipped.setDiamonds(rs.getString(6));
                    ps.getPlayer().setNeck(neckEquipped);

                }

                //feet
                if(rs.getInt(4)==5){
                    FeetArmor feetArmor = FeetArmorController.getById(rs.getInt(3));

                    feetArmor.setDiamonds(rs.getString(6));
                    ps.getPlayer().setFeet(feetArmor);

                }

                //chest
                if(rs.getInt(4)==6){
                    ChestArmor chestArmor = ChestArmorController.getById(rs.getInt(3));

                    chestArmor.setDiamonds(rs.getString(6));
                    ps.getPlayer().setChest(chestArmor);

                }

                //pants
                if(rs.getInt(4)==7){
                    PantsArmor pantsArmor = PantsArmorController.getById(rs.getInt(3));

                    pantsArmor.setDiamonds(rs.getString(6));
                    ps.getPlayer().setPants(pantsArmor);

                }

                //shield
                if(rs.getInt(4)==8){
                    Shield shield = ShieldController.getById(rs.getInt(3));

                    shield.setDiamonds(rs.getString(6));
                    ps.getPlayer().setShield(shield);

                }

            }

           ps.getPlayer().setBackpack(BackpackController.getPlayerBackpack(ps.getPlayer().getId()));





        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return ps;


    }


}
