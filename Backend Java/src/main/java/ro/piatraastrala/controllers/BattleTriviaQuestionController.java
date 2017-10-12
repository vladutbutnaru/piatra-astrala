package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.BattleTriviaQuestion;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

/**
 * This class provides SQL support for handling trivia questions for PVP and PVE
 *
 * @author Vlad Butnaru
 * @version 1.0
 */

public class BattleTriviaQuestionController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static ArrayList<BattleTriviaQuestion> getAllQuestions() {

        ArrayList<BattleTriviaQuestion> questions = new ArrayList<>();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT * FROM battle_trivia WHERE Active = 1");
            rs = stmt.executeQuery();

            while (rs.next()) {

                BattleTriviaQuestion l = new BattleTriviaQuestion();
                l.setId(rs.getInt(1));
                l.setQuestionText(rs.getString(2));
                l.setAnswer(rs.getInt(3));
                l.setActive(rs.getInt(4) > 0);

                questions.add(l);


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }


        return questions;


    }


}
