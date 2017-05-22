import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SingleMissionPage } from '../singleMission/singlemission';
@Component({
    selector: 'page-missions',
    templateUrl: 'missions.html'
})
export class MissionsPage {
    public unfinishedMissions: any;
    public radarMission: any;
    public email: any;
    public allMissions: any;
    public finishedMissions: any;
    public intervalSet = false;
    public status = -1;
    public user = {
        email: "dada",
        password: "dada",
        oras: "dada",
        numeCaracter: "dada",
        numarTelefon: "dada",
        dataNasterii: "dada",
        missionID: 14


    }

    constructor(public navCtrl: NavController, public params: NavParams, public http: Http) {
        this.email = params.data;

        if (params.data == null) {
            this.email = params.data.data;

        }
        else {
            this.email = params.data;

        }

        this.getMissionsForUser();


    }


    getMissionsForUser() {


        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let options = new RequestOptions({ headers: headers });

        var data = 'player=' + this.email;


        this.http.post("http://localhost:8080/missions/v1/getforplayer", data, options)
            .subscribe(data => {

                this.allMissions = data['_body'];
                this.allMissions = JSON.parse(this.allMissions);
                this.unfinishedMissions = "";
                this.finishedMissions = "";
                for (let i = 0; i < this.allMissions.length; i++) {


                    if (this.allMissions[i].missionStatus == 1) {
                        this.unfinishedMissions += '<ion-item class="item item-block item-ios" ><ion-avatar item-start="" id="missionList_' + this.allMissions[i].mission.id + '"> <img src="assets/img/mission.jpg"> </ion-avatar><div class="item-inner"><div class="input-wrapper"><!--bindings={ "ng-reflect-ng-if": "true" }--><ion-label class="label label-ios"> <h2 id="missionList_' + this.allMissions[i].mission.id + '" >' + this.allMissions[i].mission.npcGiverObject.name + '</h2> <h3 id="missionList_' + this.allMissions[i].mission.id + '">' + this.allMissions[i].mission.title + '</h3> <p>' + this.allMissions[i].mission.description + '</p> </ion-label></div><!--bindings={ "ng-reflect-ng-if": "false" }--></div><div class="button-effect"></div></ion-item>';
                    }
                    else {
                        this.finishedMissions += '<ion-item class="item item-block item-ios" ><ion-avatar item-start="" id="missionList_' + this.allMissions[i].mission.id + '"> <img src="assets/img/mission.jpg"> </ion-avatar><div class="item-inner"><div class="input-wrapper"><!--bindings={ "ng-reflect-ng-if": "true" }--><ion-label class="label label-ios"> <h2 id="missionList_' + this.allMissions[i].mission.id + '" >' + this.allMissions[i].mission.npcGiverObject.name + '</h2> <h3 id="missionList_' + this.allMissions[i].mission.id + '">' + this.allMissions[i].mission.title + '</h3> <p>' + this.allMissions[i].mission.description + '</p> </ion-label></div><!--bindings={ "ng-reflect-ng-if": "false" }--></div><div class="button-effect"></div></ion-item>';

                    }

                    this.status = -1;





                }

                setInterval(this.getMissionsForUser(), 1000 * 10);



            }, error => {
                console.log(error);// Error getting the data
            });


    }
    ionViewDidLoad() {
        this.addSelectorHandler();
    }
    addSelectorHandler() {
        document.querySelector('#listaMisiuni').addEventListener('click', (event) => {


            //clicked on a mission
            if (event.target['id'].split('_')[0] == 'missionList') {



                this.user.missionID = event.target['id'].split('_')[1];
                this.navCtrl.push(SingleMissionPage, { user: this.user });
            }



        });


    }
}
