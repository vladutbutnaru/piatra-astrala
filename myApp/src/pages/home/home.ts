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



    }






  };
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

    this.http.post("http://localhost:8080/players/v1/getstats", data, options)
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
              document.getElementById("player-weapon-left").style.border = "2px solid ##77b064";

            //heroic
            if (this.userInfo.weapon.rarity == 3)
              document.getElementById("player-weapon-left").style.border = "2px solid #cb72d8";

            //epic
            if (this.userInfo.weapon.rarity == 4)
              document.getElementById("player-weapon-left").style.border = "2px solid #d78b06";
            //legendary
            if (this.userInfo.weapon.rarity == 5)
              document.getElementById("player-weapon-left").style.border = "2px solid #f95252";
            //mithic
            if (this.userInfo.weapon.rarity == 6)
              document.getElementById("player-weapon-left").style.border = "2px solid #c90b0b";

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
              document.getElementById("player-weapon-left").style.border = "2px solid ##77b064";
              document.getElementById("player-weapon-right").style.border = "2px solid ##77b064";

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
              document.getElementById("player-weapon-left").style.border = "2px solid #f95252";
              document.getElementById("player-weapon-right").style.border = "2px solid #f95252";
            }
            //mithic
            if (this.userInfo.weapon.rarity == 6) {
              document.getElementById("player-weapon-left").style.border = "2px solid #c90b0b";
              document.getElementById("player-weapon-right").style.border = "2px solid #c90b0b";
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
            document.getElementById("player-bracelet-left").style.border = "2px solid ##77b064";
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
            document.getElementById("player-bracelet-left").style.border = "2px solid #f95252";

          }
          //mithic
          if (this.userInfo.handAccessoriesOne.rarity == 6) {
            document.getElementById("player-bracelet-left").style.border = "2px solid #c90b0b";

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
            document.getElementById("player-bracelet-right").style.border = "2px solid ##77b064";
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
            document.getElementById("player-bracelet-right").style.border = "2px solid #f95252";

          }
          //mithic
          if (this.userInfo.handAccessoriesTwo.rarity == 6) {
            document.getElementById("player-bracelet-right").style.border = "2px solid #c90b0b";

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
            document.getElementById("player-helmet").style.border = "2px solid ##77b064";
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
            document.getElementById("player-helmet").style.border = "2px solid #f95252";

          }
          //mithic
          if (this.userInfo.helmet.rarity == 6) {
            document.getElementById("player-helmet").style.border = "2px solid #c90b0b";

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
            document.getElementById("player-neck").style.border = "2px solid ##77b064";
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
            document.getElementById("player-neck").style.border = "2px solid #f95252";

          }
          //mithic
          if (this.userInfo.neck.rarity == 6) {
            document.getElementById("player-neck").style.border = "2px solid #c90b0b";

          }

        }


      }, error => {
        console.log(error);// Error getting the data
      });


  }

}
