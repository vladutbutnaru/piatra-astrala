import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
email:any;
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
    influence:0
    
    
    
    };
  constructor(public navCtrl: NavController, public params:NavParams, private geolocation: Geolocation, public http: Http) {
      this.email = this.params.data;
    console.log("Primit in Home: " + this.email);
    this.getUserStats();
      
  }

getUserStats(){
    
     var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
 
     var data = 'email=' + this.email;
    
    this.http.post("http://localhost:8080/players/v1/getstats", data, options)
      .subscribe(data => {
        console.log(data['_body']);
             
          
          
          
          
          
       }, error => {
        console.log(error);// Error getting the data
      });
  
    
}

}
