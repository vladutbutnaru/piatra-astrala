import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TabsPage } from '../tabs/tabs';

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
      title: "Puterea echipei",
      description: "Vei reprezenta <i>puterea</i> echipei tale. Vei purta razboaie impreuna cu coechipierii tai, vei proteja alchimistii, agricultorii si exploratorii, va trebui sa cresti influenta clanului tau si vei juca un rol important in drumul catre Piatra Astrala.",
      image: "assets/img/shield.png",
    },
    {
      title: "Gardianul cuferelor",
      description: "Echipa ta va depinde de abilitatile tale de a pazi cuferele voastre. Va trebui sa fii mereu atent la cine le da tarcoale, la echipele rivale si vei fi nevoit sa fii pregatit de atac in orice clipa!",
      image: "assets/img/chest.png",
    }
  ];
    
    
    
}
      
            
      if(this.chemare == 'agricultor'){
      this.slides = [
    {
      title: "Agricultorul, mereu ocupat",
      description: "Agricultorii sunt mereu pe fuga. De la <i>cultivarea pamantului</i>, la organizarea chest-urilor, la <i>pescuit</i>, <i>crafting</i>, gatit, ei au un rol esential in sustinerea tuturor celorlalti coechipieri. ",
      image: "assets/img/grass.png",
    },
    {
      title: "Negot & Economie",
      description: "Cu resursele si itemele pe care le detine echipa ta, vei putea deschide o taraba la care sa vinzi ceea ce au adunat sau produs coechipierii tai. In pietele mari din teritoriu vei gasi in fiecare zi cate ceva care sa aduca valoare clanului in care te afli.",
      image: "assets/img/shop.png",
    },
    {
      title: "Crafting",
      description: "Cu ajutorul materialelor pe care le vei strange, vei putea construi iteme noi, sau imbunatati unele existente. Va trebui sa repari arme si armuri, sa produci sageti pentru arcuri, sa faci armuri, sabii, sceptre, undite si altele.",
      image: "assets/img/hammer.png",
    }
  ];
    
    
    
}
      
                
      if(this.chemare == 'explorator'){
      this.slides = [
    {
      title: "Exploratorul, calatorul neinfricat",
      description: "Exploratorii sunt cunoscuti pentru dorinta lor de a cunoaste taramuri noi si a descoperi lumi si tinuturi stravechi. Ei joaca un rol esential in obiectivul principal al jocului, acela de a gasi <b>Piatra Astrala</b>. ",
      image: "assets/img/compass.png",
    },
    {
      title: "Descoperirea indiciilor",
      description: "Vei descoperi indicii care te vor ghida spre cea mai de pret comoara din joc, si anume Piatra Astrala. Bazandu-te pe indiciile gasite, descifrandu-le, adunand bucati din harta straveche si luptand cu pericolele de pe drum, echipa ta va reusi sa castige.",
      image: "assets/img/diamond.png",
    },
    {
      title: "Calatorii si drumetii",
      description: "Misiunile Chemarii tale te vor plimba prin intregul tinut, te vor pune in situatii dificile din care va trebui sa iesi invingator, cu ajutorul echipei tale. Negotul iti este in sange, pentru a ajunge la resursele rare, va trebui sa calatoresti si sa iti gasesti drumul inapoi spre casa.",
      image: "assets/img/travel.png",
    }
  ];
    
    
    
}
  }
    
    
 
    
    
    
finishRegistration(){
      var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded' );
    let options = new RequestOptions({ headers: headers });
 
     var data = 'email=' + this.user.email + '&password=' + this.user.password + '&city=' + this.user.oras + '&characterName=' + this.user.numeCaracter + '&phoneNumber=' + this.user.numarTelefon + '&chemare=' + this.chemare;
    
    this.http.post("http://192.168.2.203:8080/players/v1/create", data, options)
      .subscribe(data => {
        console.log(data['_body']);
            this.navCtrl.push(TabsPage, {email: this.user.email});
       }, error => {
        console.log(error);// Error getting the data
      });
    
    
}
    
    
    
    
}
