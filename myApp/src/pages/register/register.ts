import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { RegisterCallingPage } from '../registerCalling/registerCalling';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

public user = {
    email: "dada",
    password: "dada",
    oras: "dada",
    numeCaracter: "dada",
    numarTelefon: "dada",
    dataNasterii: "dada"
    
    
}
    
constructor(public navCtrl: NavController) {

  }

    
registerStep2(){
     this.navCtrl.push(RegisterCallingPage, {user: this.user});
    
}
    

    
    
}
