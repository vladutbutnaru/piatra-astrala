import { Component, ElementRef, AfterContentInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MissionsPage } from '../missions/missions';
import { AlertController } from 'ionic-angular';

import * as $ from 'jquery'

@Component({
  selector: 'page-radar',
  templateUrl: 'radar.html'
})
export class RadarPage {


  public coordinates = {
    lat: 2.4,
    lng: 2.5

  }
  public npcInformation = {
    name: "Gigel Frone",
    title: "Cuceritorul de smecheri",
    bio: "asdf"


  }

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
    handAccessories: [],
    playerStats: {
      agility: 0,
      chakraRegen: 0,
      currentChakra: 0,
      currentHealth: 0,
      experience: 0,
      fatigue: 0,
      fatigueRegen: 0,
      fatigueUpdateDate: 0,
      healthRegen: 0,
      hunger: 0,
      hungerRegen: 0,
      id: 0,
      idPlayer: 0,
      influence: 0,
      intelligence: 0,
      level: 0,
      maxChakra: 0,
      maxHealth: 0,
      spirit: 0,
      strength: 0



    },
    backpack: {
      currentNumberOfItems: 0,
      icon: "",
      id: 0,
      items: [],
      name: "",
      slots: 0


    }

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
  public missionList: any;
  public lakeList: any;
  public npcList: any;
  public npcCloseFront: string;
  public isNpcMissionOpen = 0;
  public missionOpen = false;
  public missionListFront: string;
  public lakesCloseFront: string;
    
  constructor(public navCtrl: NavController, public params: NavParams, private geolocation: Geolocation, public http: Http, private elRef: ElementRef, private alertController: AlertController) {
    this.userInfo = this.params.data;
    console.log("Primit in Radar: " + this.userInfo);
    this.getNearby();
      
  }


  getNearby() {
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

      this.getNPCCall();
      this.getLakesCall();
    });


  }

  getNPCCall() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'lat=' + this.coordinates.lat + '&lng=' + this.coordinates.lng + '&meters=10000';

    this.http.post("http://localhost:8080/npc/v1/get", data, options)
      .subscribe(data => {
        this.npcList = data['_body'];
        this.npcList = JSON.parse(this.npcList);
        console.log(this.npcList);
        this.npcCloseFront = "";
         this.missionListFront="";
        for (let i = 0; i < this.npcList.length; i++) {

          var marginTop = Math.floor(Math.random() * 3) + 1;
          var marginLeft = Math.floor(Math.random() * 12) + 6;

          this.npcCloseFront += '<div id="npc_' + this.npcList[i].id + '" class="npc bounceInDown" style="margin-top:' + marginTop + '%; margin-left:' + marginLeft + 'px;background-image:url(assets/img/npc_mission.png);"></div>';
          for (let j = 0; j < this.npcList[i].missions.length; j++) {
            if (this.npcList[i].missions[j].status == 0 || this.npcList[i].missions[j].status == null) {
              this.missionListFront += '<div class="npcMissionActive" id="mission_' + this.npcList[i].missions[j].id + '">' + this.npcList[i].missions[j].title + '</div>';
            }
            else {

              this.missionListFront += '<div class="npcMissionCompleted" id="missionToComplete_' +  this.npcList[i].missions[j].id+ '">' + this.npcList[i].missions[j].title + '</div>';

            }
          }
        }

        if (this.isNpcMissionOpen == 0) {
          this.showNPCMissionPopup();
          this.isNpcMissionOpen = 1;
        }
      }, error => {
        console.log(error);// Error getting the data
      });

  }
    
    getLakesCall(){
        
         var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'lat=' + this.coordinates.lat + '&lng=' + this.coordinates.lng + '&meters=10000';

    this.http.post("http://localhost:8080/lakes/v1/get", data, options)
      .subscribe(data => {
        this.lakeList = data['_body'];
        this.lakeList = JSON.parse(this.lakeList);
        console.log(this.lakeList);
        this.lakesCloseFront = "";
       
        
        for (let i = 0; i < this.lakeList.length; i++) {

          var marginTop = Math.floor(Math.random() * 3) + 1;
          var marginLeft = Math.floor(Math.random() * 12) + 6;

          this.lakesCloseFront += '<div id="lake_' + this.lakeList[i].id + '" class="lake bounceInDown" style="margin-top:' + marginTop + '%; margin-left:' + marginLeft + 'px;background-image:url(assets/img/water.png);"></div>';
       
        }

      
      }, error => {
        console.log(error);// Error getting the data
      });
        
        
    }


  showNPCMissionPopup() {
    document.querySelector('body').addEventListener('click', (event) => {
      if (event.target['id'].split('_')[0] == 'npc') {
        for (let i = 0; i < this.npcList.length; i++) {
          //clicked on an NPC
          if (this.npcList[i].id == event.target['id'].split('_')[1]) {
            this.npcInformation.name = this.npcList[i].name;
            this.npcInformation.bio = this.npcList[i].description;
            this.npcInformation.title = this.npcList[i].title;
        
          }
        }
        this.missionOpen = true;
      }
      else {
        //clicked on a mission
        if (event.target['id'].split('_')[0] == 'mission') {

          //accept mission
          this.acceptMission(event.target['id'].split('_')[1]);

        }
        else {
          //clicked on a mission to be completed
          if (event.target['id'].split('_')[0] == 'missionToComplete') {
            //finish mission
            this.finishMission(event.target['id'].split('_')[1]);

          }
          this.missionOpen = false;
        }




      }
    });

  }

  acceptMission(missionID: any) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'mission=' + missionID + '&player=' + this.userInfo.name;
    this.missionListFront = "";
    this.http.post("http://localhost:8080/missions/v1/acceptmission", data, options)
      .subscribe(data => {

        let alert = this.alertController.create({
          title: 'Misiune acceptata!',
          subTitle: 'Felicitari, ai acceptat misiunea! O vei gasi in meniul "Misiuni".',
          buttons: ['OK']
        });
        alert.present();



      }, error => {
        console.log(error);// Error getting the data
      });



  }

  finishMission(missionID: any) {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'mission=' + missionID + '&player=' + this.userInfo.name;
    this.missionListFront = "";
    this.http.post("http://localhost:8080/missions/v1/finishmission", data, options)
      .subscribe(data => {

        let alert = this.alertController.create({
          title: 'Misiune finalizata!',
          subTitle: 'Felicitari, ai finalizat misiunea! O vei gasi in meniul "Misiuni Terminate".',
          buttons: ['OK']
        });
        alert.present();



      }, error => {
        console.log(error);// Error getting the data
      });



  }

}
