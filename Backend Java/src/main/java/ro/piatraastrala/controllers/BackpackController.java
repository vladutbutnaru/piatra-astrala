package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Backpack;
import ro.piatraastrala.entities.Item;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * This class provides SQL support for handling backpack items for a player
 *
 * @author Vlad Butnaru
 * @version 1.0
 */

public class BackpackController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static Backpack getPlayerBackpack(int playerId) {

        Backpack b = new Backpack();

        PreparedStatement stmt;
        ResultSet rs;
        System.out.println("Getting backpack for player with id " + playerId);

        try {
            stmt = conn.prepareStatement("SELECT ID_Backpack FROM Player_Backpacks WHERE ID_Player = ?");
            stmt.setInt(1, playerId);
            rs = stmt.executeQuery();

            if (rs.next()) {
                stmt = conn.prepareStatement("SELECT * FROM Item_Backpacks WHERE ID = ?");
                stmt.setInt(1, rs.getInt(1));
                rs = stmt.executeQuery();

                if (rs.next()) {
                    b.setId(rs.getInt(1));
                    b.setSlots(rs.getInt(2));
                    b.setName(rs.getString(3));
                    b.setIcon(rs.getString(4));

                    stmt = conn.prepareStatement("SELECT * FROM Backpack_Items WHERE ID_Player = ?");
                    stmt.setInt(1, playerId);
                    rs = stmt.executeQuery();

                    while (rs.next()) {
                        System.out.println("Adding item to backpack ");
                        Item item = ItemController.getById(rs.getInt(5));
                        item.setCurrentDurability(rs.getInt(7));
                        item.setDiamonds(rs.getString(6));
                        item.setAmount(rs.getInt(4));
                        System.out.println("Adding item " + item.getName() + " to backpack ");
                        b.getItems().add(item);


                    }


                }


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        b.setCurrentNumberOfItems(b.getItems().size());
        return b;


    }
}
