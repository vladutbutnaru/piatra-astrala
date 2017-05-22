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
    influence: 0



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

      }, error => {
        console.log(error);// Error getting the data
      });


  }

}
