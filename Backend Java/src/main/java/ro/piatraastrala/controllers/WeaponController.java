package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Mission;
import ro.piatraastrala.entities.Weapon;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by Vlad Butnaru on 5/23/2017.
 */
public class WeaponController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();



    public static Weapon getById(int id) {
        Weapon m = new Weapon();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Item_Weapons WHERE ID = ?");
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            if (rs.next()) {

                m.setId(id);
               m.setName(rs.getString(2));
               m.setDescription(rs.getString(3));
               m.setType(rs.getInt(4));
               m.setLevel(rs.getInt(5));
               m.setIcon(rs.getString(6));
               m.setRarity(rs.getInt(7));
               m.setAttackSpeed(rs.getDouble(8));
               m.setStrength(rs.getInt(9));
               m.setDurability(rs.getInt(10));
               m.setWeight(rs.getDouble(11));
               m.setCalling(rs.getString(12));
                m.setSpirit(rs.getInt(13));
                m.setSlots(rs.getInt(14));



            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return m;


    }

}
