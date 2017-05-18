package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.Player;
import ro.piatraastrala.utils.DBConnection;

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
          stmt.setString(1,p.getPassword());
          stmt.setString(2,p.getEmail());
          stmt.setString(3,p.getCity());
          stmt.setString(4,p.getCharacterName());
          stmt.setString(5,p.getPhoneNumber());
            stmt.setString(6,p.getCalling());
            stmt.executeUpdate();
            rs = stmt.getGeneratedKeys();
            rs.next();
            newId = rs.getInt(1);


        } catch (SQLException ex) {
            // handle any errors

            logger.error(ex.getMessage());

        }

        return newId;


    }

    public static int getIDByEmail(String email){
        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT ID FROM Players WHERE Email = ?");
            stmt.setString(1,email);

            rs = stmt.executeQuery();

            while(rs.next()){
                return rs.getInt(1);


            }

        }
        catch(Exception e){
            logger.error(e.getMessage());


        }
        return 0;



    }


}
