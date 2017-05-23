package ro.piatraastrala.entities;

/**
 * Created by Vlad Butnaru on 5/23/2017.
 */
public class Weapon {
    private int id;
    private String name;
    private String description;
    private int type; //1-single-handed 2-dual-handed 3-bow
    private int level;
    private String icon;
    private int rarity;
    private double attackSpeed;
    private int strength;
    private int durability;
    private double weight;
    private String calling;
    private int slots;
    private int spirit;
    private int currentDurability;
    private String diamonds;
    private int amount;

    public int getCurrentDurability() {
        return currentDurability;
    }

    public void setCurrentDurability(int currentDurability) {
        this.currentDurability = currentDurability;
    }

    public String getDiamonds() {
        return diamonds;
    }

    public void setDiamonds(String diamonds) {
        this.diamonds = diamonds;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public int getSpirit() {
        return spirit;
    }

    public void setSpirit(int spirit) {
        this.spirit = spirit;
    }

    public int getSlots() {
        return slots;
    }

    public void setSlots(int slots) {
        this.slots = slots;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public int getRarity() {
        return rarity;
    }

    public void setRarity(int rarity) {
        this.rarity = rarity;
    }

    public double getAttackSpeed() {
        return attackSpeed;
    }

    public void setAttackSpeed(double attackSpeed) {
        this.attackSpeed = attackSpeed;
    }

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
    }

    public int getDurability() {
        return durability;
    }

    public void setDurability(int durability) {
        this.durability = durability;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getCalling() {
        return calling;
    }

    public void setCalling(String calling) {
        this.calling = calling;
    }
}
