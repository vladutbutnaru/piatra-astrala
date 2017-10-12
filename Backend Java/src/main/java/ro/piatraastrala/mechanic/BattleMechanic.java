package ro.piatraastrala.mechanic;

import ro.piatraastrala.entities.BattleTriviaQuestion;
import ro.piatraastrala.entities.BattleTriviaQuestionSet;
import ro.piatraastrala.utils.CacheManager;

import java.util.ArrayList;
import java.util.Random;

public class BattleMechanic {
    private static final Random r = new Random();

    public static BattleTriviaQuestionSet prepareBattle() {
        ArrayList<BattleTriviaQuestion> questionsInBattle = new ArrayList<>();

        int low = 1;
        int high = CacheManager.getAllTriviaQuestions().size();
        for (int i = 0; i < 5; i++) {
            int questionNumber = r.nextInt(high - low) + low;
            if (!questionsInBattle.contains(CacheManager.getAllTriviaQuestions().get(questionNumber)))
                questionsInBattle.add(CacheManager.getAllTriviaQuestions().get(questionNumber));
        }
        BattleTriviaQuestionSet questionSet = new BattleTriviaQuestionSet();
        questionSet.setQuestions(questionsInBattle);
        return questionSet;

    }
}
