package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Mission;
import ro.piatraastrala.entities.MissionWithStatus;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/18/2017.
 */
public class MissionController {

    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();


    public static Mission getById(int id) {
        Mission m = new Mission();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Missions WHERE ID = ?");
            stmt.setInt(1, id);
            rs = stmt.executeQuery();

            while (rs.next()) {

                m.setId(id);
                m.setMissionType(rs.getInt(2));
                m.setNpcGiver(rs.getInt(3));
                m.setNpcToComplete(rs.getInt(4));
                m.setTitle(rs.getString(5));
                m.setDescription(rs.getString(6));
                m.setNpcGiverObject(NonPlayerCharacterController.getById(m.getNpcGiver()));


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return m;


    }

    public static ArrayList<Mission> getMissionsForNpc(int npcId, int playerID) {
        ArrayList<Mission> missions = new ArrayList<Mission>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Missions WHERE Npc_Giver_Id = ?");
            stmt.setInt(1, npcId);
            rs = stmt.executeQuery();

            while (rs.next()) {
                Mission m = new Mission();
                m.setId(rs.getInt(1));

                m.setMissionType(rs.getInt(2));
                m.setNpcGiver(rs.getInt(3));
                m.setNpcToComplete(rs.getInt(4));
                m.setTitle(rs.getString(5));
                m.setStatus(getMissionStatus(m.getId(), playerID));
                m.setDescription(rs.getString(6));
                if (getMissionStatus(m.getId(), playerID) == 0)
                    missions.add(m);


            }

            stmt = conn.prepareStatement("SELECT * FROM Missions WHERE Npc_To_Complete_Id = ?");
            stmt.setInt(1, npcId);
            rs = stmt.executeQuery();
            while (rs.next()) {
                Mission m = new Mission();
                m.setId(rs.getInt(1));

                m.setMissionType(rs.getInt(2));
                m.setNpcGiver(rs.getInt(3));
                m.setNpcToComplete(rs.getInt(4));
                m.setTitle(rs.getString(5));
                m.setDescription(rs.getString(6));
                m.setStatus(getMissionStatus(m.getId(), playerID));
                System.out.println("Avem misiunea cu statusul : " + m.getStatus());
                if (m.getStatus() == 1 && m.getNpcToComplete() == npcId)
                    missions.add(m);


            }


        } catch (Exception e) {
            logger.error(e.getMessage());


        }

        return missions;
    }

    public static ArrayList<MissionWithStatus> getUserMissions(int playerId) {
        ArrayList<MissionWithStatus> missions = new ArrayList<MissionWithStatus>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM Player_Missions WHERE ID_Player = ?");
            stmt.setInt(1, playerId);
            rs = stmt.executeQuery();

            while (rs.next()) {
                Mission m = getById(rs.getInt(2));
                MissionWithStatus ms = new MissionWithStatus();
                ms.setMission(m);
                ms.setMissionStatus(rs.getInt(4));

                missions.add(ms);

            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }

        return missions;


    }


    public static int getMissionStatus(int missionId, int playerId) {
        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT Status FROM Player_Missions WHERE ID_Player = ? AND  ID_Mission = ?");
            stmt.setInt(1, playerId);
            stmt.setInt(2, missionId);
            rs = stmt.executeQuery();

            while (rs.next()) {
                return rs.getInt(1);


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return 0;


    }


    public static void acceptMissionForPlayer(int missionId, int playerId) {

        PreparedStatement stmt;


        try {
            stmt = conn.prepareStatement("INSERT INTO  Player_Missions(ID_Mission, ID_Player, Status) VALUES(?,?,?)");
            stmt.setInt(2, playerId);
            stmt.setInt(1, missionId);
            stmt.setInt(3, 1);
            stmt.executeUpdate();


        } catch (Exception e) {
            logger.error(e.getMessage());


        }

    }

    public static void finishMissionForPlayer(int missionId, int playerId) {

        PreparedStatement stmt;


        try {
            stmt = conn.prepareStatement("UPDATE Player_Missions SET Status = 2 WHERE ID_Mission = ? AND ID_Player = ?");
            stmt.setInt(2, playerId);
            stmt.setInt(1, missionId);

            stmt.executeUpdate();


        } catch (Exception e) {
            logger.error(e.getMessage());


        }

    }


}