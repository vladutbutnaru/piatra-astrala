import { Component, ElementRef, AfterContentInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as $ from 'jquery'

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
    
public coordinates = {
    lat: 2.4,
    lng: 2.5
    
}
public npcInformation = {
    name: "Gigel Frone",
    title: "Cuceritorul de smecheri",
    bio: "Lorem ipsum sit odor talent alea alea chestii trestii socoteli sadlfjaslkdjf alksdjf laskdj flaksdj flkasdj flkasjd flkasdj flkasdj flkasdj flaskdj flaksdj flasdjkfaslkdjhf aslkdjfh aslkdjhf alksdjhf alksdjhf alksjdh falksjdhf askljdhf aslkdjfh askljdhf alksjdhf askljdfh aslkdjhf aslkjdhf alksjdhf alksjdhf lkasjhdf aslkdjhf salkdjhf "
    
    
}
    
public npcList:any;
public npcCloseFront:string;
public isNpcMissionOpen = 0;
public missionOpen = false;
    
constructor(public navCtrl: NavController,  public params:NavParams, private geolocation: Geolocation,  public http: Http, private elRef:ElementRef) {
  this.user.email= this.params.data;
    console.log("Primit in Radar: " + this.user.email);
    this.getNearby();
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
    this.coordinates.lat = data.coords.latitude;
    this.coordinates.lng = data.coords.longitude;
    console.log(data.coords.latitude + " good ");
    console.log(data.coords.longitude);
    this.getNPCCall();
});

    
}
    
    getNPCCall(){
      var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
 
     var data = 'lat=' + this.coordinates.lat + '&lng=' + this.coordinates.lng + '&meters=100';
    
    this.http.post("http://192.168.2.203:8080/npc/v1/get", data, options)
      .subscribe(data => {
            this.npcList = data['_body'];
            this.npcList = JSON.parse(this.npcList);
          this.npcCloseFront = "";
          
    for(let i = 0; i<this.npcList.length; i++){
        
        var marginTop =   Math.floor(Math.random() * 3) + 1;
        var marginLeft = Math.floor(Math.random() * 12) + 6 ;
            
        this.npcCloseFront += '<div id="npc_' + this.npcList[i].id + '" class="npc" style="margin-top:' + marginTop + '%; margin-left:' + marginLeft + 'px" "></div>';
              
    }

if(this.isNpcMissionOpen == 0){
this.showNPCMissionPopup();
   this.isNpcMissionOpen = 1;
}
         
          
       }, error => {
        console.log(error);// Error getting the data
      });
    



    

    
}
showNPCMissionPopup(){
    document.querySelector('body').addEventListener('click', (event)=> {
    console.log(event.target['id']);    
if(event.target['id'].split('_')[0] == 'npc'){
    for(let i = 0; i<this.npcList.length; i++){
if(this.npcList[i].id == event.target['id'].split('_')[1]){
this.npcInformation.name = this.npcList[i].name;
this.npcInformation.bio = this.npcList[i].description;
this.npcInformation.title = this.npcList[i].title;
    
}
                
        
        
    }
  this.missionOpen=true;
  
}
else{
    
    this.missionOpen = false;
}
  
    
});
    
    
}
    
}
