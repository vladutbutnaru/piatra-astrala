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
    this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error gettsing ocation', error);
});

let watch = this.geolocation.watchPosition();
watch.subscribe((data) => {
 // data can be a set of coordinates, or an error (if an error occurred).
 // data.coords.latitude
 // data.coords.longitude
    console.log(data.coords.latitude);
    console.log(data.coords.longitude);
});
    
}

}
