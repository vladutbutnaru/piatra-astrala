import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email: any;
  item = {
    amount: 0,
    attackSpeed: 3,
    calling: '',
    chakraRegen: 0,
    currentDurability: 0,
    description: '',
    diamonds: '',
    durability: 0,
    extraChakra: 0,
    extraHealth: 0,
    fatigueRegen: 0,
    healthRegen: 0,
    icon: '',
    id: 0,
    level: 0,
    meleeDefense: 0,
    name: '',
    rarity: 0,
    slots: 0,
    spellDefense: 0,
    spirit: 0,
    strength: 0,
    type: 0,
    weight: 0

  };


  npc = {
    description: "",
    icon: "",
    id: 0,
    lat: 0.0,
    lng: 0.0,
    missions: []


  };

    mission = {
    classSpecific: "",
    description: "",
    id: 0,
    minLevel: 0,
    missionType: 0,
    npcGiver: 0,
    npcGiverObject: this.npc


  };


  userInfo = {
    name: '',
    level: '',
    calling: '',
    strength: 0,
    intelligence: 0,
    agility: 0,
    fatigue: 0,
    spirit: 0,
    health: 0,
    chakra: 0,
    influence: 0,
    weapon: this.item,
    handAccessoriesOne: this.item,
    handAccessoriesTwo: this.item,
    helmet: this.item,
    neck: this.item,
    chest: this.item,
    feet: this.item,
    pants: this.item,
    shield: this.item,
    handAccessories: [],
    playerStats: {
        agility: 0,
        chakraRegen:0,
        currentChakra:0,
        currentHealth:0,
        experience:0,
        fatigue:0,
        fatigueRegen:0,
        fatigueUpdateDate:0,
        healthRegen:0,
        hunger:0,
        hungerRegen:0,
        id:0,
        idPlayer:0,
        influence:0,
        intelligence:0,
        level:0,
        maxChakra:0,
        maxHealth:0,
        spirit:0,
        strength:0



    },
    backpack:{
      currentNumberOfItems:0,
      icon:"",
      id:0,
      items:[],
      name:"",
      slots:0


    }

  };

  itemOpen = false;
  itemPopover = this.item;

  loggedInUser: any;

  itemAttributes: string;
  inventoryItems: string;

  constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http) {
    this.loggedInUser = this.params.data;
   // console.log("Primit in Home: ");
   // console.log(this.loggedInUser);
    

  }

  getUserStats() {

     //   var response = JSON.parse(data['_body']);
       // console.log(response)
       this.userInfo = this.loggedInUser;
       console.log(this.userInfo);


        // //backpack
         document.getElementById("player-backpack").style.backgroundImage = "url(assets/img/" + this.userInfo.backpack.icon + ")";

         document.getElementById("fatigue-bar").style.width = this.userInfo.playerStats.fatigue + "%";
         var healthP = 100 * (this.userInfo.playerStats.currentHealth / this.userInfo.playerStats.maxHealth);

        document.getElementById("health-bar").style.width = healthP + "%";

        var chakraP = 100 * ( this.userInfo.playerStats.currentChakra /  this.userInfo.playerStats.maxChakra);
       document.getElementById("health-bar").style.width = chakraP + "%";

        if (this.userInfo.calling == "agricultor")
          document.getElementById("player-image").style.backgroundImage = "url(assets/img/farmer.jpg)";

        if (this.userInfo.calling == "explorator")
          document.getElementById("player-image").style.backgroundImage = "url(assets/img/explorer.jpg)";

        if (this.userInfo.calling == "luptator")
          document.getElementById("player-image").style.backgroundImage = "url(assets/img/warrior.jpg)";

        if (this.userInfo.calling == "alchemist")
          document.getElementById("player-image").style.backgroundImage = "url(assets/img/alchemist.jpg)";

        //check if has weapon
        if (this.userInfo.weapon != null) {
          //check if single handed
          if (this.userInfo.weapon.type == 1) {
            //place icon

            document.getElementById("player-weapon-left").style.backgroundImage = "url(assets/img/" + this.userInfo.weapon.icon + ")";

            //rarity check
            //common
            if (this.userInfo.weapon.rarity == 1)
              document.getElementById("player-weapon-left").style.border = "2px solid white";
            //rare
            if (this.userInfo.weapon.rarity == 2)
              document.getElementById("player-weapon-left").style.border = "2px solid #606FCA";

            //heroic
            if (this.userInfo.weapon.rarity == 3)
              document.getElementById("player-weapon-left").style.border = "2px solid #cb72d8";

            //epic
            if (this.userInfo.weapon.rarity == 4)
              document.getElementById("player-weapon-left").style.border = "2px solid #d78b06";
            //legendary
            if (this.userInfo.weapon.rarity == 5)
              document.getElementById("player-weapon-left").style.border = "2px solid #FBB7FF";
            //mithic
            if (this.userInfo.weapon.rarity == 6)
              document.getElementById("player-weapon-left").style.border = "2px solid #E15697";

          }
          //check if dual weilded
          if (this.userInfo.weapon.type == 2) {
            //place icon

            document.getElementById("player-weapon-left").style.backgroundImage = "url(assets/img/" + this.userInfo.weapon.icon + ")";
            document.getElementById("player-weapon-right").style.backgroundImage = "url(assets/img/" + this.userInfo.weapon.icon + ")";
            //rarity check
            //common
            if (this.userInfo.weapon.rarity == 1) {
              document.getElementById("player-weapon-left").style.border = "2px solid white";
              document.getElementById("player-weapon-right").style.border = "2px solid white";
            }
            //rare
            if (this.userInfo.weapon.rarity == 2) {
              document.getElementById("player-weapon-left").style.border = "2px solid #606FCA";
              document.getElementById("player-weapon-right").style.border = "2px solid #606FCA";

            }

            //heroic
            if (this.userInfo.weapon.rarity == 3) {
              document.getElementById("player-weapon-left").style.border = "2px solid #cb72d8";
              document.getElementById("player-weapon-right").style.border = "2px solid #cb72d8";
            }

            //epic
            if (this.userInfo.weapon.rarity == 4) {
              document.getElementById("player-weapon-left").style.border = "2px solid #d78b06";
              document.getElementById("player-weapon-right").style.border = "2px solid #d78b06";
            }
            //legendary
            if (this.userInfo.weapon.rarity == 5) {
              document.getElementById("player-weapon-left").style.border = "2px solid #FBB7FF";
              document.getElementById("player-weapon-right").style.border = "2px solid #FBB7FF";
            }
            //mithic
            if (this.userInfo.weapon.rarity == 6) {
              document.getElementById("player-weapon-left").style.border = "2px solid #E15697";
              document.getElementById("player-weapon-right").style.border = "2px solid #E15697";
            }

          }
        }


        //check if has hand accessories
        if (this.userInfo.handAccessories[0] != null) {
        this.userInfo.handAccessoriesOne = this.userInfo.handAccessories[0];
          //place icon

          document.getElementById("player-bracelet-left").style.backgroundImage = "url(assets/img/" + this.userInfo.handAccessoriesOne.icon + ")";
          //rarity check
          //common
          if (this.userInfo.handAccessoriesOne.rarity == 1) {
            document.getElementById("player-bracelet-left").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.handAccessoriesOne.rarity == 2) {
            document.getElementById("player-bracelet-left").style.border = "2px solid #606FCA";
          }

          //heroic
          if (this.userInfo.handAccessoriesOne.rarity == 3) {
            document.getElementById("player-bracelet-left").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.handAccessoriesOne.rarity == 4) {
            document.getElementById("player-bracelet-left").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.handAccessoriesOne.rarity == 5) {
            document.getElementById("player-bracelet-left").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.handAccessoriesOne.rarity == 6) {
            document.getElementById("player-bracelet-left").style.border = "2px solid #E15697";

          }

        }

        //check if has hand accessories
        if (this.userInfo.handAccessories[1] != null) {
        this.userInfo.handAccessoriesTwo = this.userInfo.handAccessories[1];
          //place icon

          document.getElementById("player-bracelet-right").style.backgroundImage = "url(assets/img/" + this.userInfo.handAccessoriesTwo.icon + ")";
          //rarity check
          //common
          if (this.userInfo.handAccessoriesTwo.rarity == 1) {
            document.getElementById("player-bracelet-right").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.handAccessoriesTwo.rarity == 2) {
            document.getElementById("player-bracelet-right").style.border = "2px solid #606FCA";
          }

          //heroic
          if (this.userInfo.handAccessoriesTwo.rarity == 3) {
            document.getElementById("player-bracelet-right").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.handAccessoriesTwo.rarity == 4) {
            document.getElementById("player-bracelet-right").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.handAccessoriesTwo.rarity == 5) {
            document.getElementById("player-bracelet-right").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.handAccessoriesTwo.rarity == 6) {
            document.getElementById("player-bracelet-right").style.border = "2px solid #E15697";

          }

        }



        //check if has helmet
        if (this.userInfo.helmet != null) {

          //place icon

          document.getElementById("player-helmet").style.backgroundImage = "url(assets/img/" + this.userInfo.helmet.icon + ")";
          //rarity check
          //common
          if (this.userInfo.helmet.rarity == 1) {
            document.getElementById("player-helmet").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.helmet.rarity == 2) {
            document.getElementById("player-helmet").style.border = "2px solid #606FCA";
          }

          //heroic
          if (this.userInfo.helmet.rarity == 3) {
            document.getElementById("player-helmet").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.helmet.rarity == 4) {
            document.getElementById("player-helmet").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.helmet.rarity == 5) {
            document.getElementById("player-helmet").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.helmet.rarity == 6) {
            document.getElementById("player-helmet").style.border = "2px solid #E15697";

          }

        }

        //check if has neck accessory
        if (this.userInfo.neck != null) {

          //place icon

          document.getElementById("player-neck").style.backgroundImage = "url(assets/img/" + this.userInfo.neck.icon + ")";
          //rarity check
          //common
          if (this.userInfo.neck.rarity == 1) {
            document.getElementById("player-neck").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.neck.rarity == 2) {
            document.getElementById("player-neck").style.border = "2px solid #606FCA";
          }

          //heroic
          if (this.userInfo.neck.rarity == 3) {
            document.getElementById("player-neck").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.neck.rarity == 4) {
            document.getElementById("player-neck").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.neck.rarity == 5) {
            document.getElementById("player-neck").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.neck.rarity == 6) {
            document.getElementById("player-neck").style.border = "2px solid #E15697";

          }

        }

        //check if chest
        if (this.userInfo.chest != null) {

          //place icon

          document.getElementById("player-chest").style.backgroundImage = "url(assets/img/" + this.userInfo.chest.icon + ")";
          //rarity check
          //common
          if (this.userInfo.chest.rarity == 1) {
            document.getElementById("player-chest").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.chest.rarity == 2) {
            document.getElementById("player-chest").style.border = "2px solid #77b064";
          }

          //heroic
          if (this.userInfo.chest.rarity == 3) {
            document.getElementById("player-chest").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.chest.rarity == 4) {
            document.getElementById("player-chest").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.chest.rarity == 5) {
            document.getElementById("player-chest").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.chest.rarity == 6) {
            document.getElementById("player-chest").style.border = "2px solid #E15697";

          }

        }

        //check if feet
        if (this.userInfo.feet != null) {

          //place icon

          document.getElementById("player-feet").style.backgroundImage = "url(assets/img/" + this.userInfo.feet.icon + ")";
          //rarity check
          //common
          if (this.userInfo.feet.rarity == 1) {
            document.getElementById("player-feet").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.feet.rarity == 2) {
            document.getElementById("player-feet").style.border = "2px solid #77b064";
          }

          //heroic
          if (this.userInfo.feet.rarity == 3) {
            document.getElementById("player-feet").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.feet.rarity == 4) {
            document.getElementById("player-feet").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.feet.rarity == 5) {
            document.getElementById("player-feet").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.feet.rarity == 6) {
            document.getElementById("player-feet").style.border = "2px solid #E15697";

          }

        }

        //check if pants
        if (this.userInfo.pants != null) {

          //place icon

          document.getElementById("player-pants").style.backgroundImage = "url(assets/img/" + this.userInfo.pants.icon + ")";
          //rarity check
          //common
          if (this.userInfo.pants.rarity == 1) {
            document.getElementById("player-pants").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.pants.rarity == 2) {
            document.getElementById("player-pants").style.border = "2px solid #77b064";
          }

          //heroic
          if (this.userInfo.pants.rarity == 3) {
            document.getElementById("player-pants").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.pants.rarity == 4) {
            document.getElementById("player-pants").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.pants.rarity == 5) {
            document.getElementById("player-pants").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.pants.rarity == 6) {
            document.getElementById("player-pants").style.border = "2px solid #E15697";

          }

        }

        //check if shield
        if (this.userInfo.shield != null) {

          //place icon

          document.getElementById("player-weapon-right").style.backgroundImage = "url(assets/img/" + this.userInfo.shield.icon + ")";
          //rarity check
          //common
          if (this.userInfo.shield.rarity == 1) {
            document.getElementById("player-weapon-right").style.border = "2px solid white";

          }
          //rare
          if (this.userInfo.shield.rarity == 2) {
            document.getElementById("player-weapon-right").style.border = "2px solid #77b064";
          }

          //heroic
          if (this.userInfo.shield.rarity == 3) {
            document.getElementById("player-weapon-right").style.border = "2px solid #cb72d8";

          }

          //epic
          if (this.userInfo.shield.rarity == 4) {
            document.getElementById("player-weapon-right").style.border = "2px solid #d78b06";

          }
          //legendary
          if (this.userInfo.shield.rarity == 5) {
            document.getElementById("player-weapon-right").style.border = "2px solid #FBB7FF";

          }
          //mithic
          if (this.userInfo.shield.rarity == 6) {
            document.getElementById("player-weapon-right").style.border = "2px solid #E15697";

          }

        }






        // //get inventory items
        this.inventoryItems = '<div class="inventory_row">';
         var x = 0;
        for (let a = 0; a < this.userInfo.backpack.items.length; a++) {
          if (x % 4 == 0 && x > 0) {
            this.inventoryItems += '</div><div class="inventory_row">'
          }
          this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + this.userInfo.backpack.items[a].icon + ')"></div>';
          x++;
        }

        // for (let a = 0; a < response.player.backpack.chestArmors.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.chestArmors[a].icon + ')"></div>';
        //   x++;
        // }

        // for (let a = 0; a < response.player.backpack.feetArmors.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.feetArmors[a].icon + ')"></div>';
        //   x++;
        // }

        // for (let a = 0; a < response.player.backpack.helmets.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.helmets[a].icon + ')"></div>';
        //   x++;
        // }

        // for (let a = 0; a < response.player.backpack.neckAccessories.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.neckAccessories[a].icon + ')"></div>';
        //   x++;
        // }

        // for (let a = 0; a < response.player.backpack.pantsArmors.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.pantsArmors[a].icon + ')"></div>';
        //   x++;
        // }


        // for (let a = 0; a < response.player.backpack.shields.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.shields[a].icon + ')"></div>';
        //   x++;
        // }

        // for (let a = 0; a < response.player.backpack.handAccessories.length; a++) {
        //   if (x % 4 == 0 && x > 0) {
        //     this.inventoryItems += '</div><div class="inventory_row">'
        //   }
        //   this.inventoryItems += ' <div class="inventory_item" style="background-image:url(assets/img/' + response.player.backpack.handAccessories[a].icon + ')"></div>';
        //   x++;
        // }




  }


  ionViewDidLoad() {
    this.getUserStats();
    document.getElementById('itemPopover').style.visibility = 'hidden';
    document.getElementById('inventoryPopover').style.visibility = 'hidden';
    this.addSelectorHandler();
  }
  
  addSelectorHandler() {
    document.querySelector('#profile-page').addEventListener('click', (event) => {


      //clicked on helmet
      switch (event.target['id']) {
        case 'player-helmet':

          this.showItemInfoPopover(1);
          break;
        case 'player-neck':

          this.showItemInfoPopover(2);
          break;
        case 'player-weapon-left':

          this.showItemInfoPopover(3);
          break;
        case 'player-weapon-right':

          this.showItemInfoPopover(4);
          break;
        case 'player-bracelet-left':

          this.showItemInfoPopover(5);
          break;
        case 'player-bracelet-right':

          this.showItemInfoPopover(6);
          break;
        case 'player-chest':

          this.showItemInfoPopover(7);
          break;

        case 'player-pants':

          this.showItemInfoPopover(8);
          break;
        case 'player-feet':

          this.showItemInfoPopover(9);
          break;

        case 'player-backpack':

          this.showInventory();
          break;
        default:
          document.getElementById('itemPopover').style.visibility = 'hidden';
          document.getElementById('inventoryPopover').style.visibility = 'hidden';

      }





    });


  }


  showItemInfoPopover(item: number) {
    var icon = "";
    var rarity = 0;
    if (item == 1 && this.userInfo.helmet != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.helmet.name;
      icon = this.userInfo.helmet.icon;
      rarity = this.userInfo.helmet.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.helmet.level;
      document.getElementById('item_description').innerHTML = this.userInfo.helmet.description;
      document.getElementById('item_class').innerHTML = this.userInfo.helmet.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.helmet.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.helmet.spirit;
      document.getElementById('durability_value').innerHTML =  "" +  this.userInfo.helmet.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.helmet.weight;
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.helmet.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.helmet.spellDefense;
      document.getElementById('itemPopover').style.visibility = '';
    }
    if (item == 2 && this.userInfo.neck != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.neck.name;
      icon = this.userInfo.neck.icon;
      rarity = this.userInfo.neck.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.neck.level;
      document.getElementById('item_description').innerHTML = this.userInfo.neck.description;
      document.getElementById('item_class').innerHTML = this.userInfo.neck.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.neck.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.neck.spirit;
      document.getElementById('durability_value').innerHTML = "" + this.userInfo.neck.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.neck.weight;
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.neck.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.neck.spellDefense;
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 3 && this.userInfo.weapon != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.weapon.name;
      icon = this.userInfo.weapon.icon;
      rarity = this.userInfo.weapon.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.weapon.level;
      document.getElementById('item_description').innerHTML = this.userInfo.weapon.description;
      document.getElementById('item_class').innerHTML = this.userInfo.weapon.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.weapon.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ " + this.userInfo.weapon.attackSpeed;
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.weapon.spirit;
      document.getElementById('durability_value').innerHTML = "" + this.userInfo.weapon.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.weapon.weight;
      document.getElementById('melee_defence_value').innerHTML = "0";
      document.getElementById('spell_defence_value').innerHTML = "0";
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 4 && this.userInfo.shield != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.shield.name;
      icon = this.userInfo.shield.icon;
      rarity = this.userInfo.shield.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.shield.level;
      document.getElementById('item_description').innerHTML = this.userInfo.shield.description;
      document.getElementById('item_class').innerHTML = this.userInfo.shield.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.shield.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.shield.spirit;
      document.getElementById('durability_value').innerHTML =  "" + this.userInfo.shield.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.shield.weight;
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.shield.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.shield.spellDefense;
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 5 && this.userInfo.handAccessoriesOne != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.handAccessoriesOne.name;
      icon = this.userInfo.handAccessoriesOne.icon;
      rarity = this.userInfo.handAccessoriesOne.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.handAccessoriesOne.level;
      document.getElementById('item_description').innerHTML = this.userInfo.handAccessoriesOne.description;
      document.getElementById('item_class').innerHTML = this.userInfo.handAccessoriesOne.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.handAccessoriesOne.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.handAccessoriesOne.spirit;
      document.getElementById('durability_value').innerHTML = "" + this.userInfo.handAccessoriesOne.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.handAccessoriesOne.weight;
      document.getElementById('melee_defence_value').innerHTML = "0";
      document.getElementById('spell_defence_value').innerHTML = "0";
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 6 && this.userInfo.handAccessoriesTwo != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.handAccessoriesTwo.name;
      icon = this.userInfo.handAccessoriesTwo.icon;
      rarity = this.userInfo.handAccessoriesTwo.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.handAccessoriesTwo.level;
      document.getElementById('item_description').innerHTML = this.userInfo.handAccessoriesTwo.description;
      document.getElementById('item_class').innerHTML = this.userInfo.handAccessoriesTwo.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.handAccessoriesTwo.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.handAccessoriesTwo.spirit;
      document.getElementById('durability_value').innerHTML = "" + this.userInfo.handAccessoriesTwo.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.handAccessoriesTwo.weight;
      document.getElementById('melee_defence_value').innerHTML = "0";
      document.getElementById('spell_defence_value').innerHTML = "0";
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 7 && this.userInfo.chest != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.chest.name;
      icon = this.userInfo.chest.icon;
      rarity = this.userInfo.chest.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.chest.level;
      document.getElementById('item_description').innerHTML = this.userInfo.chest.description;
      document.getElementById('item_class').innerHTML = this.userInfo.chest.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.chest.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.chest.spirit;
      document.getElementById('durability_value').innerHTML = "" + this.userInfo.chest.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.chest.weight;
      document.getElementById('melee_defence_value').innerHTML = "0";
      document.getElementById('spell_defence_value').innerHTML = "0";
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.chest.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.chest.spellDefense;
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 8 && this.userInfo.pants != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.pants.name;
      icon = this.userInfo.pants.icon;
      rarity = this.userInfo.pants.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.pants.level;
      document.getElementById('item_description').innerHTML = this.userInfo.pants.description;
      document.getElementById('item_class').innerHTML = this.userInfo.pants.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.pants.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.pants.spirit;
      document.getElementById('durability_value').innerHTML =  "" + this.userInfo.pants.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.pants.weight;
      document.getElementById('melee_defence_value').innerHTML = "0";
      document.getElementById('spell_defence_value').innerHTML = "0";
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.pants.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.pants.spellDefense;
      document.getElementById('itemPopover').style.visibility = '';
    }

    if (item == 9 && this.userInfo.feet != null) {
      document.getElementById('item_name').innerHTML = this.userInfo.feet.name;
      icon = this.userInfo.feet.icon;
      rarity = this.userInfo.feet.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.feet.level;
      document.getElementById('item_description').innerHTML = this.userInfo.feet.description;
      document.getElementById('item_class').innerHTML = this.userInfo.feet.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.feet.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.feet.spirit;
      document.getElementById('durability_value').innerHTML = "" + this.userInfo.feet.currentDurability;
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.feet.weight;
      document.getElementById('melee_defence_value').innerHTML = "0";
      document.getElementById('spell_defence_value').innerHTML = "0";
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.feet.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.feet.spellDefense;
      document.getElementById('itemPopover').style.visibility = '';
    }

    document.getElementById('item_icon').style.backgroundImage = "url(assets/img/" + icon + ")";

    //rarity check
    //common
    if (rarity == 1) {
      document.getElementById('item_icon').style.border = "2px solid white";
      document.getElementById('item_rarity').innerHTML = "Comun";
      document.getElementById('item_rarity').style.color = "white";
    }
    //rare
    if (rarity == 2) {
      document.getElementById('item_icon').style.border = "2px solid #77b064";
      document.getElementById('item_rarity').innerHTML = "Rar";
      document.getElementById('item_rarity').style.color = "#77b064";
    }

    //heroic
    if (rarity == 3) {
      document.getElementById('item_icon').style.border = "2px solid #cb72d8";
      document.getElementById('item_rarity').innerHTML = "Eroic";
      document.getElementById('item_rarity').style.color = "#cb72d8";
    }

    //epic
    if (rarity == 4) {
      document.getElementById('item_icon').style.border = "2px solid #d78b06";
      document.getElementById('item_rarity').innerHTML = "Epic";
      document.getElementById('item_rarity').style.color = "#d78b06";

    }
    //legendary
    if (rarity == 5) {
      document.getElementById('item_icon').style.border = "2px solid #FBB7FF";
      document.getElementById('item_rarity').innerHTML = "Legendar";
      document.getElementById('item_rarity').style.color = "#FBB7FF";

    }
    //mithic
    if (rarity == 6) {
      document.getElementById('item_icon').style.border = "2px solid #E15697";
      document.getElementById('item_rarity').innerHTML = "Mitic";
      document.getElementById('item_rarity').style.color = "#E15697";

    }

  }

  showInventory() {

    document.getElementById('inventoryPopover').style.visibility = '';

  }







}
