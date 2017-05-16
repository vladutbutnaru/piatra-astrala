import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-register-calling-character',
  templateUrl: 'registerCallingCharacter.html'
})
export class RegisterCallingCharacterPage {
public user = {
    email: "dada",
    password: "dada",
    oras: "dada",
    numeCaracter: "dada",
    numarTelefon: "dada",
    dataNasterii: "dada"
    
    
}
    
chemare:any;
    
    slides:any;
    
    
    
  constructor(public navCtrl: NavController, public params:NavParams, public http: Http) {
  this.user= params.get("user");
      
    this.chemare = params.get("chemare");
    console.log("Primit in register calling character: " + this.user.email);
    console.log("Ales chemare " + this.chemare);
if(this.chemare == 'alchemist'){
      this.slides = [
    {
      title: "Alchemistul, maestrul potiunilor",
      description: "Alchemistii sunt intelectuali foarte priceputi in arta <b>potiunilor</b>. Ei pot prepara licori care sa ofere <i>putere</i>, <i>chakra</i>, <i>viata</i> celorlalti jucatori.",
      image: "assets/img/potion-blue.png",
    },
    {
      title: "Vraji & Descantece",
      description: "Ei se nasc cu mostenirea magicienilor, care le permite sa citeasca si sa inteleaga carti despre vraji si descantece. Aceasta aptitudine le permite sa <b>ajute</b> ceilalti jucatori si sa se afirme prin <b>puterea</b> lor magica.",
      image: "assets/img/spellbook.png",
    },
    {
      title: "Stapanii noptii",
      description: "Ritualurile lor <b>oculte</b>, care pot fi executate doar pe parcursul noptii, le permite sa obtina <i>abilitati noi</i>, sa <i>creasca puterea de vindecare</i> a coechipierilor si sa vrajeasca diverse iteme din joc pentru a le face mai puternice.",
      image: "assets/img/moon.png",
    }
  ];
    
    
    
}
      
      if(this.chemare == 'luptator'){
      this.slides = [
    {
      title: "Luptatorul, bravul erou",
      description: "Luptatorii sunt soldati bravi, care apara tinuturile folosidu-se de <b>forta bruta</b>, <b>arme puternice</b> si <b>armuri stralucitoare</b>. Ei participa in <i>batalii intre clanuri</i>, lupta in <i>arena</i> si sunt bine cunoscuti pentru stamina lor extraordinara. ",
      image: "assets/img/sword.png",
    },
    {
      title: "Vraji & Descantece",
      description: "Ei se nasc cu mostenirea magicienilor, care le permite sa citeasca si sa inteleaga carti despre vraji si descantece. Aceasta aptitudine le permite sa <b>ajute</b> ceilalti jucatori si sa se afirme prin <b>puterea</b> lor magica.",
      image: "assets/img/spellbook.png",
    },
    {
      title: "Stapanii noptii",
      description: "Ritualurile lor <b>oculte</b>, care pot fi executate doar pe parcursul noptii, le permite sa obtina <i>abilitati noi</i>, sa <i>creasca puterea de vindecare</i> a coechipierilor si sa vrajeasca diverse iteme din joc pentru a le face mai puternice.",
      image: "assets/img/moon.png",
    }
  ];
    
    
    
}
      
      
  }
    
    
 
    
    
    
finishRegistration(){
      var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
 
     var data = 'email=' + this.user.email + '&password=' + this.user.password + '&city=' + this.user.oras + '&characterName=' + this.user.numeCaracter + '&phoneNumber=' + this.user.numarTelefon;
    
    this.http.post("http://192.168.2.203:8080/players/v1/create", data, options)
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);// Error getting the data
      });
    
    
    
    
    
}
}
