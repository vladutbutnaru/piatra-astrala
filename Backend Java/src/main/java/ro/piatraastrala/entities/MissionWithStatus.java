package ro.piatraastrala.entities;

/**
 * Created by Vlad Butnaru on 5/19/2017.
 */
public class MissionWithStatus {

    private int missionStatus;
    private Mission mission;

    public int getMissionStatus() {
        return missionStatus;
    }

    public void setMissionStatus(int missionStatus) {
        this.missionStatus = missionStatus;
    }

    public Mission getMission() {
        return mission;
    }

    public void setMission(Mission mission) {
        this.mission = mission;
    }
}
