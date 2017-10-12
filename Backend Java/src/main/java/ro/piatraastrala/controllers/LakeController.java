package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Lake;
import ro.piatraastrala.utils.DBConnection;
import ro.piatraastrala.utils.DistanceUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * This class provides SQL support for handling lake locations
 *
 * @author Vlad Butnaru
 * @version 1.0
 */

public class LakeController {

    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static ArrayList<Lake> getAllLakes() {

        ArrayList<Lake> lakes = new ArrayList<>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Lakes");
            rs = stmt.executeQuery();

            while (rs.next()) {

                Lake l = new Lake();
                l.setId(rs.getInt(1));
                l.setLng(rs.getDouble(2));
                l.setLat(rs.getDouble(3));
                l.setName(rs.getString(4));
                l.setDescription(rs.getString(5));
                l.setIcon(rs.getString(6));

                lakes.add(l);


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return lakes;


    }

    public static ArrayList<Lake> getLakesNearby(double lat, double lng, int metersClose) {
        ArrayList<Lake> lakes = new ArrayList<>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Lakes");
            rs = stmt.executeQuery();

            while (rs.next()) {
                if (DistanceUtils.distance(rs.getDouble(3), rs.getDouble(2), lat, lng, 'K') < metersClose / 1000.0) {
                    Lake l = new Lake();
                    l.setId(rs.getInt(1));
                    l.setLng(rs.getDouble(2));
                    l.setLat(rs.getDouble(3));
                    l.setName(rs.getString(4));
                    l.setDescription(rs.getString(5));
                    l.setIcon(rs.getString(6));

                    lakes.add(l);

                }


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return lakes;

    }
}
