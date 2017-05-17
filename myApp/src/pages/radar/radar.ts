import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-radar',
  templateUrl: 'radar.html'
})
export class RadarPage {

public user = {
    email: "dada",
    password: "dada",
    oras: "dada",
    numeCaracter: "dada",
    numarTelefon: "dada",
    dataNasterii: "dada"
    
    
}
    
constructor(public navCtrl: NavController,  public params:NavParams, private geolocation: Geolocation) {
  this.user.email= this.params.data;
    console.log("Primit in Home: " + this.user.email);
    this.getNearby;
  }

    
getNearby(){
        this.geolocation.getCurrentPosition().then((resp) => {
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting ocation', error);
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
