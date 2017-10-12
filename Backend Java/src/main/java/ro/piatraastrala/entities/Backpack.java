package ro.piatraastrala.entities;

import java.util.ArrayList;

/**
 * Entity class
 *
 * @author Vlad Butnaru
 * @version 1.0
 */
public class Backpack {

    private int id;
    private int slots;
    private String name;
    private String icon;
    private int currentNumberOfItems;
    private ArrayList<Item> items = new ArrayList<Item>();

    public ArrayList<Item> getItems() {
        return items;
    }

    public void setItems(ArrayList<Item> items) {
        this.items = items;
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
