package ro.piatraastrala.entities;

/**
 * Entity class
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class Item {

    private int id;
    private String name;
    private String description;
    private int level;
    private String icon;
    private int rarity;
    private int strength;
    private double weight;
    private String calling;
    private int slots;
    private int spirit;
    private String diamonds;
    private int amount;
    private int meleeDefense;
    private int spellDefense;
    private int type;
    private double attackSpeed;
    private int durability;
    private int currentDurability;
    private int chakraRegen;
    private int healthRegen;
    private int fatigueRegen;


    private int extraHealth;
    private int extraChakra;


    public int getFatigueRegen() {
        return fatigueRegen;
    }

    public void setFatigueRegen(int fatigueRegen) {
        this.fatigueRegen = fatigueRegen;
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

    public int getStrength() {
        return strength;
    }

    public void setStrength(int strength) {
        this.strength = strength;
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

    public int getSlots() {
        return slots;
    }

    public void setSlots(int slots) {
        this.slots = slots;
    }

    public int getSpirit() {
        return spirit;
    }

    public void setSpirit(int spirit) {
        this.spirit = spirit;
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

    public int getMeleeDefense() {
        return meleeDefense;
    }

    public void setMeleeDefense(int meleeDefense) {
        this.meleeDefense = meleeDefense;
    }

    public int getSpellDefense() {
        return spellDefense;
    }

    public void setSpellDefense(int spellDefense) {
        this.spellDefense = spellDefense;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public double getAttackSpeed() {
        return attackSpeed;
    }

    public void setAttackSpeed(double attackSpeed) {
        this.attackSpeed = attackSpeed;
    }

    public int getDurability() {
        return durability;
    }

    public void setDurability(int durability) {
        this.durability = durability;
    }

    public int getCurrentDurability() {
        return currentDurability;
    }

    public void setCurrentDurability(int currentDurability) {
        this.currentDurability = currentDurability;
    }

    public int getChakraRegen() {
        return chakraRegen;
    }

    public void setChakraRegen(int chakraRegen) {
        this.chakraRegen = chakraRegen;
    }

    public int getHealthRegen() {
        return healthRegen;
    }

    public void setHealthRegen(int healthRegen) {
        this.healthRegen = healthRegen;
    }

    public int getExtraHealth() {
        return extraHealth;
    }

    public void setExtraHealth(int extraHealth) {
        this.extraHealth = extraHealth;
    }

    public int getExtraChakra() {
        return extraChakra;
    }

    public void setExtraChakra(int extraChakra) {
        this.extraChakra = extraChakra;
    }
}
