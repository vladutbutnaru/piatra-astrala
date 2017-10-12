package ro.piatraastrala.entities;

import java.util.ArrayList;

/**
 * Entity class
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class BattleTriviaQuestionSet {

    ArrayList<BattleTriviaQuestion> questions;

    public ArrayList<BattleTriviaQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<BattleTriviaQuestion> questions) {
        this.questions = questions;
    }
}
