package ro.piatraastrala.entities;

/**
 * Entity class
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class Mission {
    private int id;
    private int missionType;
    private int npcGiver;
    private int npcToComplete;
    private String title;
    private String description;
    private NonPlayerCharacter npcGiverObject;
    private NonPlayerCharacter npcToCompleteObject;
    private int status;
    private int playerId;
    private int minLevel;
    private String classSpecific;

    public String getClassSpecific() {
        return classSpecific;
    }

    public void setClassSpecific(String classSpecific) {
        this.classSpecific = classSpecific;
    }

    public int getMinLevel() {
        return minLevel;
    }

    public void setMinLevel(int minLevel) {
        this.minLevel = minLevel;
    }

    public NonPlayerCharacter getNpcToCompleteObject() {
        return npcToCompleteObject;
    }

    public void setNpcToCompleteObject(NonPlayerCharacter npcToCompleteObject) {
        this.npcToCompleteObject = npcToCompleteObject;
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId(int playerId) {
        this.playerId = playerId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public NonPlayerCharacter getNpcGiverObject() {
        return npcGiverObject;
    }

    public void setNpcGiverObject(NonPlayerCharacter npcGiverObject) {
        this.npcGiverObject = npcGiverObject;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMissionType() {
        return missionType;
    }

    public void setMissionType(int missionType) {
        this.missionType = missionType;
    }

    public int getNpcGiver() {
        return npcGiver;
    }

    public void setNpcGiver(int npcGiver) {
        this.npcGiver = npcGiver;
    }

    public int getNpcToComplete() {
        return npcToComplete;
    }

    public void setNpcToComplete(int npcToComplete) {
        this.npcToComplete = npcToComplete;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
