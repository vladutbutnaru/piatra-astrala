package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.NonPlayerCharacter;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/17/2017.
 */
public class NonPlayerCharacterController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static ArrayList<NonPlayerCharacter> getNPCsNeaby(double lat, double lng){
        ArrayList<NonPlayerCharacter> characters = new ArrayList<NonPlayerCharacter>();






        return characters;


    }
}
