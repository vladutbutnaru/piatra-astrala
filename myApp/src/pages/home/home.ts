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
    weapon: {
      icon: '',
      attackSpeed: 3,
      calling: '',
      currentDurability: 0,
      description: '',
      diamonds: '',
      durability: 0,
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0
    },
    handAccessoriesOne: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0
    },
    handAccessoriesTwo: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0
    },
    helmet: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0,
      meleeDefense: 0,
      spellDefense: 0
    },
    neck: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0,
      meleeDefense: 0,
      spellDefense: 0
    },
    chest: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0,
      meleeDefense: 0,
      spellDefense: 0
    },
    feet: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0,
      meleeDefense: 0,
      spellDefense: 0
    },
    pants: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0,
      meleeDefense: 0,
      spellDefense: 0
    },
    shield: {
      icon: '',
      calling: '',
      description: '',
      diamonds: '',
      level: 0,
      name: '',
      rarity: 0,
      slots: 0,
      spirit: 0,
      strength: 0,
      type: 0,
      weight: 0,
      meleeDefense: 0,
      spellDefense: 0
    }
  };

  itemOpen = false;
  itemPopover = {
    icon: '',
    calling: '',
    description: '',
    diamonds: '',
    level: 0,
    name: '',
    rarity: 0,
    slots: 0,
    spirit: 0,
    strength: 0,
    type: 0,
    weight: 0,
    meleeDefense: 0,
    spellDefense: 0



  };

  itemAttributes: string;

  constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http) {
    this.email = this.params.data;
    console.log("Primit in Home: " + this.email);
    this.getUserStats();

  }

  getUserStats() {

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'email=' + this.email;

    this.http.post("http://192.168.1.172:8080/players/v1/getstats", data, options)
      .subscribe(data => {

        var response = JSON.parse(data['_body']);
        console.log(response);
        this.userInfo.name = response.characterName;
        this.userInfo.calling = response.calling;
        this.userInfo.level = response.level;
        this.userInfo.strength = response.strength;
        this.userInfo.intelligence = response.intelligence;
        this.userInfo.agility = response.agility;
        this.userInfo.fatigue = response.fatigue;
        this.userInfo.spirit = response.spirit;
        this.userInfo.health = response.currentHealth;
        this.userInfo.chakra = response.currentChakra;
        this.userInfo.influence = response.influence;
        //weapon
        this.userInfo.weapon = response.player.weapon;

        //hand accessories
        if (response.player.handAccessories.length > 0) {
          this.userInfo.handAccessoriesOne = response.player.handAccessories[0];
        }
        if (response.player.handAccessories.length > 1) {
          this.userInfo.handAccessoriesTwo = response.player.handAccessories[1];
        }

        //helmet
        this.userInfo.helmet = response.player.helmet;

        //neck
        this.userInfo.neck = response.player.neck;

        //chest
        this.userInfo.chest = response.player.chest;

        //feet
        this.userInfo.feet = response.player.feet;

        //pants
        this.userInfo.pants = response.player.pants;

        //shield
        this.userInfo.shield = response.player.shield;

        document.getElementById("fatigue-bar").style.width = response.fatigue + "%";
        var healthP = 100 * (response.currentHealth / response.maxHealth);

        document.getElementById("health-bar").style.width = healthP + "%";

        var chakraP = 100 * (response.currentChakra / response.maxChakra);
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
        if (response.player.handAccessories[0] != null) {

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
        if (response.player.handAccessories[1] != null) {

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
        if (response.player.helmet != null) {

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
        if (response.player.neck != null) {

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
        if (response.player.chest != null) {

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
        if (response.player.feet != null) {

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
        if (response.player.pants != null) {

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
        if (response.player.shield != null) {

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


      }, error => {
        console.log(error);// Error getting the data
      });


  }


  ionViewDidLoad() {
    document.getElementById('itemPopover').style.visibility = 'hidden';
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


        default:
          document.getElementById('itemPopover').style.visibility = 'hidden';

      }





    });


  }


  showItemInfoPopover(item: number) {
    var icon = "";
    var rarity = 0;
    if (item == 1) {
      document.getElementById('item_name').innerHTML = this.userInfo.helmet.name;
      icon = this.userInfo.helmet.icon;
      rarity = this.userInfo.helmet.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.helmet.level;
      document.getElementById('item_description').innerHTML = this.userInfo.helmet.description;
      document.getElementById('item_class').innerHTML = this.userInfo.helmet.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.helmet.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.helmet.spirit;
      document.getElementById('durability_value').innerHTML = "100";
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.helmet.weight;
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.helmet.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.helmet.spellDefense;

    }
        if (item == 2) {
      document.getElementById('item_name').innerHTML = this.userInfo.neck.name;
      icon = this.userInfo.neck.icon;
      rarity = this.userInfo.neck.rarity;
      document.getElementById('item_level').innerHTML = "Nivel " + this.userInfo.neck.level;
      document.getElementById('item_description').innerHTML = this.userInfo.neck.description;
      document.getElementById('item_class').innerHTML = this.userInfo.neck.calling;
      document.getElementById('strength_value').innerHTML = "+ " + this.userInfo.neck.strength;
      document.getElementById('attack_speed_value').innerHTML = "+ 0";
      document.getElementById('spirit_value').innerHTML = "+ " + this.userInfo.neck.spirit;
      document.getElementById('durability_value').innerHTML = "100";
      document.getElementById('weight_value').innerHTML = "" + this.userInfo.neck.weight;
      document.getElementById('melee_defence_value').innerHTML = "+ " + this.userInfo.neck.meleeDefense;
      document.getElementById('spell_defence_value').innerHTML = "+ " + this.userInfo.neck.spellDefense;

    }
    document.getElementById('itemPopover').style.visibility = '';
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









}
