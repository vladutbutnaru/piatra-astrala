package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.ChestArmor;
import ro.piatraastrala.entities.FeetArmor;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by Vlad Butnaru on 5/23/2017.
 */
public class FeetArmorController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();



    public static FeetArmor getById(int id) {
        FeetArmor m = new FeetArmor();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Item_Feet WHERE ID = ?");
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            if (rs.next()) {

                m.setId(id);
                m.setName(rs.getString(2));
                m.setDescription(rs.getString(3));

                m.setLevel(rs.getInt(4));
                m.setIcon(rs.getString(5));
                m.setRarity(rs.getInt(6));

                m.setStrength(rs.getInt(7));

                m.setWeight(rs.getDouble(8));
                m.setCalling(rs.getString(9));
                m.setSpirit(rs.getInt(10));
                m.setSlots(rs.getInt(11));
                m.setMeleeDefense(rs.getInt(12));
                m.setSpellDefense(rs.getInt(13));


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return m;


    }
}
