package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Item;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * This class provides SQL support for handling items for a player
 * including equipped ones.
 *
 * @author Vlad Butnaru
 * @version 1.0
 */

public class ItemController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static ArrayList<Item> getAllItems() {
        ArrayList<Item> items = new ArrayList<Item>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Items");

            rs = stmt.executeQuery();

            if (rs.next()) {
                Item m = new Item();
                m.setId(rs.getInt(1));
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
                m.setMeleeDefense(rs.getInt(15));
                m.setSpellDefense(rs.getInt(16));
                m.setHealthRegen(rs.getInt(17));
                m.setFatigueRegen(rs.getInt(18));
                m.setChakraRegen(rs.getInt(19));
                m.setExtraHealth(rs.getInt(20));
                m.setExtraChakra(rs.getInt(21));


                items.add(m);
            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return items;


    }


    public static Item getById(int id) {


        PreparedStatement stmt;
        ResultSet rs;
        Item m = new Item();

        try {
            stmt = conn.prepareStatement("SELECT * FROM Items WHERE ID = ?");
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            if (rs.next()) {

                m.setId(rs.getInt(1));
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
                m.setMeleeDefense(rs.getInt(15));
                m.setSpellDefense(rs.getInt(16));
                m.setHealthRegen(rs.getInt(17));
                m.setFatigueRegen(rs.getInt(18));
                m.setChakraRegen(rs.getInt(19));
                m.setExtraHealth(rs.getInt(20));
                m.setExtraChakra(rs.getInt(21));


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return m;
    }
}
