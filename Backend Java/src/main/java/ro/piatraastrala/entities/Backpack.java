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
    private int currentNumberOfItems;
    private ArrayList<ChestArmor> chestArmors = new ArrayList<ChestArmor>();
    private ArrayList<Helmet> helmets = new ArrayList<Helmet>();
    private ArrayList<HandAccessory> handAccessories = new ArrayList<HandAccessory>();
    private ArrayList<Weapon> weapons = new ArrayList<Weapon>();
    private ArrayList<NeckAccessory> neckAccessories = new ArrayList<NeckAccessory>();
    private ArrayList<FeetArmor> feetArmors = new ArrayList<>();
    private ArrayList<Shield> shields = new ArrayList<>();
    private ArrayList<PantsArmor> pantsArmors = new ArrayList<PantsArmor>();

    public ArrayList<ChestArmor> getChestArmors() {
        return chestArmors;
    }

    public void setChestArmors(ArrayList<ChestArmor> chestArmors) {
        this.chestArmors = chestArmors;
    }

    public ArrayList<Helmet> getHelmets() {
        return helmets;
    }

    public void setHelmets(ArrayList<Helmet> helmets) {
        this.helmets = helmets;
    }

    public ArrayList<HandAccessory> getHandAccessories() {
        return handAccessories;
    }

    public void setHandAccessories(ArrayList<HandAccessory> handAccessories) {
        this.handAccessories = handAccessories;
    }

    public ArrayList<Weapon> getWeapons() {
        return weapons;
    }

    public void setWeapons(ArrayList<Weapon> weapons) {
        this.weapons = weapons;
    }

    public ArrayList<NeckAccessory> getNeckAccessories() {
        return neckAccessories;
    }

    public void setNeckAccessories(ArrayList<NeckAccessory> neckAccessories) {
        this.neckAccessories = neckAccessories;
    }

    public ArrayList<FeetArmor> getFeetArmors() {
        return feetArmors;
    }

    public void setFeetArmors(ArrayList<FeetArmor> feetArmors) {
        this.feetArmors = feetArmors;
    }

    public ArrayList<Shield> getShields() {
        return shields;
    }

    public void setShields(ArrayList<Shield> shields) {
        this.shields = shields;
    }

    public ArrayList<PantsArmor> getPantsArmors() {
        return pantsArmors;
    }

    public void setPantsArmors(ArrayList<PantsArmor> pantsArmors) {
        this.pantsArmors = pantsArmors;
    }

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

    public int getCurrentNumberOfItems() {
        return currentNumberOfItems;
    }

    public void setCurrentNumberOfItems(int currentNumberOfItems) {
        this.currentNumberOfItems = currentNumberOfItems;
    }
}
