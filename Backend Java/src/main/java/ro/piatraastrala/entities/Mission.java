package ro.piatraastrala.entities;

/**
 * Created by Vlad Butnaru on 5/18/2017.
 */
public class Mission {
    private int id;
    private int missionType;
    private int npcGiver;
    private int npcToComplete;
    private String title;
    private String description;
    private NonPlayerCharacter npcGiverObject;

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
