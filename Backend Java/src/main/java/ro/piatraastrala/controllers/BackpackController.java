package ro.piatraastrala.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import ro.piatraastrala.entities.*;
import ro.piatraastrala.utils.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 * Created by Vlad Butnaru on 5/24/2017.
 */
public class BackpackController {
    public static Logger logger = LoggerFactory.getLogger(PlayerController.class);
    public static Connection conn = (Connection) DBConnection.getConnection();

    public static Backpack getPlayerBackpack(int playerId) {

        Backpack b = new Backpack();

        PreparedStatement stmt;
        ResultSet rs;

        try {
            stmt = conn.prepareStatement("SELECT ID_Backpack FROM Player_Backpacks WHERE ID_Player = ?");
            stmt.setInt(1, playerId);
            rs = stmt.executeQuery();

            if (rs.next()) {
                stmt = conn.prepareStatement("SELECT * FROM Item_Backpacks WHERE ID = ?");
                stmt.setInt(1, rs.getInt(1));
                rs = stmt.executeQuery();

                if (rs.next()) {
                    b.setId(rs.getInt(1));
                    b.setSlots(rs.getInt(2));
                    b.setName(rs.getString(3));
                    b.setIcon(rs.getString(4));

                    stmt = conn.prepareStatement("SELECT * FROM Backpack_Items WHERE ID_Player = ?");
                    stmt.setInt(1, playerId);
                    rs = stmt.executeQuery();

                    while (rs.next()) {
                        //weapon
                        if (rs.getInt(3) == 1) {
                            Weapon weaponEquipped = WeaponController.getById(rs.getInt(5));
                            weaponEquipped.setCurrentDurability(rs.getInt(7));
                            weaponEquipped.setDiamonds(rs.getString(6));
                            weaponEquipped.setAmount(rs.getInt(4));
                            b.getWeapons().add(weaponEquipped);

                        }
                        //hand accessory

                        if (rs.getInt(3) == 2) {
                            HandAccessory handAccessoryEquipped = HandAccessoryController.getById(rs.getInt(5));
                            handAccessoryEquipped.setAmount(rs.getInt(4));
                            handAccessoryEquipped.setDiamonds(rs.getString(6));
                            b.getHandAccessories().add(handAccessoryEquipped);

                        }

                        //helmet

                        if (rs.getInt(3) == 3) {
                            Helmet helmetEquipped = HelmetController.getById(rs.getInt(5));
                            helmetEquipped.setAmount(rs.getInt(4));
                            helmetEquipped.setDiamonds(rs.getString(6));
                            b.getHelmets().add(helmetEquipped);

                        }

                        //neck

                        if (rs.getInt(3) == 4) {
                            NeckAccessory neckEquipped = NeckAccessoryController.getById(rs.getInt(5));
                            neckEquipped.setAmount(rs.getInt(4));
                            neckEquipped.setDiamonds(rs.getString(6));
                            b.getNeckAccessories().add(neckEquipped);

                        }

                        //feet
                        if (rs.getInt(3) == 5) {
                            FeetArmor feetArmor = FeetArmorController.getById(rs.getInt(5));
                            feetArmor.setAmount(rs.getInt(4));
                            feetArmor.setDiamonds(rs.getString(6));
                            b.getFeetArmors().add(feetArmor);

                        }

                        //chest
                        if (rs.getInt(3) == 6) {
                            ChestArmor chestArmor = ChestArmorController.getById(rs.getInt(5));
                            chestArmor.setAmount(rs.getInt(4));
                            chestArmor.setDiamonds(rs.getString(6));
                            b.getChestArmors().add(chestArmor);

                        }

                        //pants
                        if (rs.getInt(3) == 7) {
                            PantsArmor pantsArmor = PantsArmorController.getById(rs.getInt(5));
                            pantsArmor.setAmount(rs.getInt(4));
                            pantsArmor.setDiamonds(rs.getString(6));
                            b.getPantsArmors().add(pantsArmor);

                        }

                        //shield
                        if (rs.getInt(3) == 8) {
                            Shield shield = ShieldController.getById(rs.getInt(5));
                            shield.setAmount(rs.getInt(5));
                            shield.setDiamonds(rs.getString(6));
                            b.getShields().add(shield);

                        }


                    }


                }


            }

        } catch (Exception e) {
            logger.error(e.getMessage());


        }
        return b;


    }
}
