package ro.piatraastrala.entities;

public class BattleTrivia {

    private int id;
    private Player player1;
    private Player player2;
    private boolean accepted;
    private BattleTriviaQuestionSet questionSet;
    private boolean ended;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Player getPlayer1() {
        return player1;
    }

    public void setPlayer1(Player player1) {
        this.player1 = player1;
    }

    public Player getPlayer2() {
        return player2;
    }

    public void setPlayer2(Player player2) {
        this.player2 = player2;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public BattleTriviaQuestionSet getQuestionSet() {
        return questionSet;
    }

    public void setQuestionSet(BattleTriviaQuestionSet questionSet) {
        this.questionSet = questionSet;
    }

    public boolean isEnded() {
        return ended;
    }

    public void setEnded(boolean ended) {
        this.ended = ended;
    }
}
