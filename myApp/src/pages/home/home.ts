import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
email
  constructor(public navCtrl: NavController, public params:NavParams, private geolocation: Geolocation) {
      this.email = this.params.data;
    console.log("Primit in Home: " + this.email);
    this.seeLocation();
      
  }

seeLocation(){
  
    
}

}
