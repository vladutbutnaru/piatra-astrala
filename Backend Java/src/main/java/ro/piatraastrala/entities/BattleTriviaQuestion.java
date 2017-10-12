package ro.piatraastrala.entities;

/**
 * Entity class
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class BattleTriviaQuestion {

    private int id;
    private String questionText;
    private int answer;
    private boolean active;

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public int getId() {

        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public int getAnswer() {
        return answer;
    }

    public void setAnswer(int answer) {
        this.answer = answer;
    }
}
