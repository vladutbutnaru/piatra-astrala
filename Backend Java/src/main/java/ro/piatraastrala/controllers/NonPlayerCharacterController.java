package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.NonPlayerCharacter;
import ro.piatraastrala.entities.Player;
import ro.piatraastrala.utils.CacheManager;
import ro.piatraastrala.utils.DBConnection;
import ro.piatraastrala.utils.DistanceUtils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * This class provides SQL support for handling NPC locations
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class NonPlayerCharacterController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();


    public static ArrayList<NonPlayerCharacter> getNPCsNeaby(double lat, double lng, int metersClose) {
        ArrayList<NonPlayerCharacter> characters = new ArrayList<NonPlayerCharacter>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM NonPlayerCharacters");
            rs = stmt.executeQuery();

            while (rs.next()) {
                if (DistanceUtils.distance(rs.getDouble(5), rs.getDouble(6), lat, lng, 'K') < metersClose / 1000.0) {
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

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return characters;


    }


    public static NonPlayerCharacter getById(int id) {
        NonPlayerCharacter npc = new NonPlayerCharacter();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM NonPlayerCharacters WHERE ID = ?");
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            while (rs.next()) {


                npc.setId(rs.getInt(1));
                npc.setName(rs.getString(2));
                npc.setIcon(rs.getString(3));
                npc.setDescription(rs.getString(4));
                npc.setLat(rs.getDouble(5));
                npc.setLng(rs.getDouble(6));
                npc.setTitle(rs.getString(7));


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return npc;


    }


    public static ArrayList<NonPlayerCharacter> getAll() {
        ArrayList<NonPlayerCharacter> npcList = new ArrayList<NonPlayerCharacter>();


        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM NonPlayerCharacters");

            rs = stmt.executeQuery();

            while (rs.next()) {

                NonPlayerCharacter npc = new NonPlayerCharacter();
                npc.setId(rs.getInt(1));
                npc.setName(rs.getString(2));
                npc.setIcon(rs.getString(3));
                npc.setDescription(rs.getString(4));
                npc.setLat(rs.getDouble(5));
                npc.setLng(rs.getDouble(6));
                npc.setTitle(rs.getString(7));
                for (Player p : CacheManager.getAllPlayers()) {
                    System.out.println("Getting missions for NPC with id " + npc.getId() + " for player with id " + p.getId());
                    npc.setMissions(MissionController.getMissionsForNpc(npc.getId(), p.getId()));

                }
                npcList.add(npc);

            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return npcList;


    }


}
