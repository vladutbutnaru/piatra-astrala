package ro.piatraastrala.entities;

import java.sql.Timestamp;
import java.util.ArrayList;

/**
 * Created by Vlad Butnaru on 5/16/2017.
 */
public class Player {

    private int id;
    private String email;
    private String password;
    private String city;
    private String characterName;
    private String phoneNumber;
    private Timestamp birthDate;
    private String calling;
    private Backpack backpack;
    private Weapon weapon;
    private ArrayList<HandAccessory> handAccessories = new ArrayList<>();
    private Helmet helmet;
    private NeckAccessory neck;
    private ChestArmor chest;
    private FeetArmor feet;
    private PantsArmor pants;
    private Shield shield;
    private ArrayList<MissionWithStatus> missions;

    public ArrayList<MissionWithStatus> getMissions() {
        return missions;
    }

    public void setMissions(ArrayList<MissionWithStatus> missions) {
        this.missions = missions;
    }

    public Shield getShield() {
        return shield;
    }

    public void setShield(Shield shield) {
        this.shield = shield;
    }

    public PantsArmor getPants() {
        return pants;
    }

    public void setPants(PantsArmor pants) {
        this.pants = pants;
    }

    public FeetArmor getFeet() {
        return feet;
    }

    public void setFeet(FeetArmor feet) {
        this.feet = feet;
    }

    public ChestArmor getChest() {
        return chest;
    }

    public void setChest(ChestArmor chest) {
        this.chest = chest;
    }

    public NeckAccessory getNeck() {
        return neck;
    }

    public void setNeck(NeckAccessory neck) {
        this.neck = neck;
    }

    public Helmet getHelmet() {
        return helmet;
    }

    public void setHelmet(Helmet helmet) {
        this.helmet = helmet;
    }

    public ArrayList<HandAccessory> getHandAccessories() {
        return handAccessories;
    }

    public void setHandAccessories(ArrayList<HandAccessory> handAccessories) {
        this.handAccessories = handAccessories;
    }

    public Weapon getWeapon() {
        return weapon;
    }

    public void setWeapon(Weapon weapon) {
        this.weapon = weapon;
    }

    public Backpack getBackpack() {
        return backpack;
    }

    public void setBackpack(Backpack backpack) {
        this.backpack = backpack;
    }

    public String getCalling() {
        return calling;
    }

    public void setCalling(String calling) {
        this.calling = calling;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Timestamp getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Timestamp birthDate) {
        this.birthDate = birthDate;
    }
}
