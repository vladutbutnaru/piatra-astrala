package ro.piatraastrala.mechanic;

import ro.piatraastrala.entities.*;
import ro.piatraastrala.utils.CacheManager;

import java.util.ArrayList;
import java.util.Random;

public class BattleMechanic {
    private static final Random r = new Random();

    public static BattleTriviaQuestionSet prepareBattle() {
        ArrayList<BattleTriviaQuestion> questionsInBattle = new ArrayList<>();

        int low = 1;
        int high = CacheManager.getAllTriviaQuestions().size();
        while (questionsInBattle.size() < 5) {
            int questionNumber = r.nextInt(high - low) + low;
            if (!questionsInBattle.contains(CacheManager.getAllTriviaQuestions().get(questionNumber)))
                questionsInBattle.add(CacheManager.getAllTriviaQuestions().get(questionNumber));
        }
        BattleTriviaQuestionSet questionSet = new BattleTriviaQuestionSet();
        questionSet.setQuestions(questionsInBattle);
        return questionSet;

    }

    public static BattleTrivia acceptBattleBetweenTwoPlayers(int player1, int player2) {

        for (BattleTrivia bt : CacheManager.getAllBattles()) {
            if (bt.getPlayer1().getId() == player1 && bt.getPlayer2().getId() == player2 && !bt.isAccepted()) {
                bt.setAccepted(true);
                return bt;
            }

        }
        return null;

    }

    public static BattleTrivia findBattleInProgress(int player1, int player2) {

        for (BattleTrivia bt : CacheManager.getAllBattles()) {
            if (bt.getPlayer1().getId() == player1 && bt.getPlayer2().getId() == player2 && bt.isAccepted() && !bt.isEnded()) {
                bt.setAccepted(true);
                return bt;
            }

        }
        return null;

    }

    public static BattleTriviaResult answerQuestionForBattle(int player1, int player2, int playerThatAnswered, int answer, int questionNumber) {
        BattleTrivia trivia = findBattleInProgress(player1, player2);
        BattleTriviaResult btr = new BattleTriviaResult();

        if (playerThatAnswered == 1)
            trivia.getQuestionSet().getQuestions().get(questionNumber - 1).setAnswerPlayer1(answer);
        else
            trivia.getQuestionSet().getQuestions().get(questionNumber - 1).setAnswerPlayer2(answer);

        int differencePlayer1 = 0;
        int differencePlayer2 = 0;

        int scorePlayer1 = 0;
        int scorePlayer2 = 0;

        if (questionNumber == 5 && trivia.getQuestionSet().getQuestions().get(4).getAnswerPlayer1() > 0 && trivia.getQuestionSet().getQuestions().get(4).getAnswerPlayer2() > 0) {
            for (BattleTriviaQuestion question : trivia.getQuestionSet().getQuestions()) {
                if (question.getAnswer() >= question.getAnswerPlayer1())
                    differencePlayer1 = question.getAnswer() - question.getAnswerPlayer1();
                else
                    differencePlayer1 = question.getAnswerPlayer1() - question.getAnswer();

                if (question.getAnswer() >= question.getAnswerPlayer2())
                    differencePlayer2 = question.getAnswer() - question.getAnswerPlayer2();
                else
                    differencePlayer2 = question.getAnswerPlayer2() - question.getAnswer();

                if (differencePlayer1 > differencePlayer2)
                    scorePlayer2++;

                if (differencePlayer2 > differencePlayer1)
                    scorePlayer1++;

                if (differencePlayer1 == differencePlayer2) {
                    scorePlayer1++;
                    scorePlayer2++;
                }

            }
            btr.setScore1(scorePlayer1);
            btr.setScore2(scorePlayer2);
            if (scorePlayer1 > scorePlayer2)
                btr.setDamageDone(calculateDamage(player1, player2));
            if (scorePlayer2 > scorePlayer1)
                btr.setDamageDone(calculateDamage(player2, player1));
            trivia.setEnded(true);
            return btr;
        }
        btr.setDamageDone(0.0);
        return btr;

    }

    public static double calculateDamage(int winnerId, int loserId) {
        Player winner = CacheManager.getPlayerById(winnerId);
        Player loser = CacheManager.getPlayerById(loserId);

        double meleeDamageTotal = winner.getWeapon().getStrength() +
                winner.getPlayerStats().getStrength();
        double spellDamageTotal = winner.getWeapon().getSpirit() + winner.getPlayerStats().getSpirit();

        double loserHealth = loser.getPlayerStats().getCurrentHealth();
        loserHealth -= meleeDamageTotal + spellDamageTotal;
        loser.getPlayerStats().setCurrentHealth(loserHealth);
        return meleeDamageTotal + spellDamageTotal;

    }
}
