package ro.piatraastrala.entities;

import java.sql.Timestamp;

/**
 * Entity class
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class PlayerStats {

    private int id;
    private int idPlayer;
    private double strength;
    private double intelligence;
    private double agility;
    private double fatigue;
    private double fatigueRegen;
    private double spirit;
    private double maxHealth;
    private double maxChakra;
    private double currentHealth;
    private double currentChakra;
    private double healthRegen;
    private double chakraRegen;
    private int experience;
    private int level;
    private int hunger;
    private int hungerRegen;
    private int influence;
    private Timestamp fatigueUpdateDate;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getIdPlayer() {
        return idPlayer;
    }

    public void setIdPlayer(int idPlayer) {
        this.idPlayer = idPlayer;
    }

    public double getStrength() {
        return strength;
    }

    public void setStrength(double strength) {
        this.strength = strength;
    }

    public double getIntelligence() {
        return intelligence;
    }

    public void setIntelligence(double intelligence) {
        this.intelligence = intelligence;
    }

    public double getAgility() {
        return agility;
    }

    public void setAgility(double agility) {
        this.agility = agility;
    }

    public double getFatigue() {
        return fatigue;
    }

    public void setFatigue(double fatigue) {
        this.fatigue = fatigue;
    }

    public double getFatigueRegen() {
        return fatigueRegen;
    }

    public void setFatigueRegen(double fatigueRegen) {
        this.fatigueRegen = fatigueRegen;
    }

    public double getSpirit() {
        return spirit;
    }

    public void setSpirit(double spirit) {
        this.spirit = spirit;
    }

    public double getMaxHealth() {
        return maxHealth;
    }

    public void setMaxHealth(double maxHealth) {
        this.maxHealth = maxHealth;
    }

    public double getMaxChakra() {
        return maxChakra;
    }

    public void setMaxChakra(double maxChakra) {
        this.maxChakra = maxChakra;
    }

    public double getCurrentHealth() {
        return currentHealth;
    }

    public void setCurrentHealth(double currentHealth) {
        this.currentHealth = currentHealth;
    }

    public double getCurrentChakra() {
        return currentChakra;
    }

    public void setCurrentChakra(double currentChakra) {
        this.currentChakra = currentChakra;
    }

    public double getHealthRegen() {
        return healthRegen;
    }

    public void setHealthRegen(double healthRegen) {
        this.healthRegen = healthRegen;
    }

    public double getChakraRegen() {
        return chakraRegen;
    }

    public void setChakraRegen(double chakraRegen) {
        this.chakraRegen = chakraRegen;
    }

    public int getExperience() {
        return experience;
    }

    public void setExperience(int experience) {
        this.experience = experience;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public int getHunger() {
        return hunger;
    }

    public void setHunger(int hunger) {
        this.hunger = hunger;
    }

    public int getHungerRegen() {
        return hungerRegen;
    }

    public void setHungerRegen(int hungerRegen) {
        this.hungerRegen = hungerRegen;
    }

    public int getInfluence() {
        return influence;
    }

    public void setInfluence(int influence) {
        this.influence = influence;
    }

    public Timestamp getFatigueUpdateDate() {
        return fatigueUpdateDate;
    }

    public void setFatigueUpdateDate(Timestamp fatigueUpdateDate) {
        this.fatigueUpdateDate = fatigueUpdateDate;
    }
}
