package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.NonPlayerCharacter;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/17/2017.
 */
public class NonPlayerCharacterController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static ArrayList<NonPlayerCharacter> getNPCsNeaby(double lat, double lng, int metersClose){
        ArrayList<NonPlayerCharacter> characters = new ArrayList<NonPlayerCharacter>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM NonPlayerCharacters");
            rs = stmt.executeQuery();

            while(rs.next()){
                if(distance(rs.getDouble(5), rs.getDouble(6), lat, lng, 'K' ) < metersClose/1000.0){
                    NonPlayerCharacter npc = new NonPlayerCharacter();
                    npc.setId(rs.getInt(1));
                    npc.setName(rs.getString(2));
                    npc.setIcon(rs.getString(3));
                    npc.setDescription(rs.getString(4));
                    npc.setLat(rs.getDouble(5));
                    npc.setLng(rs.getDouble(6));
                    npc.setTitle(rs.getString(7));
                    characters.add(npc);

                }


            }

        }
        catch(Exception e){
            logger.error(e.getMessage());


        }


        return characters;


    }


    private static double distance(double lat1, double lon1, double lat2, double lon2, char unit) {
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        if (unit == 'K') {
            dist = dist * 1.609344;
        } else if (unit == 'N') {
            dist = dist * 0.8684;
        }


        return (dist);
    }

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    /*::  This function converts decimal degrees to radians             :*/
    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    /*::  This function converts radians to decimal degrees             :*/
    /*:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/
    private static double rad2deg(double rad) {
        return (rad * 180.0 / Math.PI);
    }
}
