package ro.piatraastrala.entities;

import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/23/2017.
 */
public class Backpack {

    private int id;
    private int slots;
    private String name;
    private String icon;
    private ArrayList<Weapon> weapons;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSlots() {
        return slots;
    }

    public void setSlots(int slots) {
        this.slots = slots;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public ArrayList<Weapon> getWeapons() {
        return weapons;
    }

    public void setWeapons(ArrayList<Weapon> weapons) {
        this.weapons = weapons;
    }
}
