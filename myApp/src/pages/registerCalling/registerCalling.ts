import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterCallingCharacterPage } from '../registerCallingCharacter/registerCallingCharacter';

@Component({
    selector: 'page-register-calling',
    templateUrl: 'registerCalling.html'
})
export class RegisterCallingPage {
    public user = {
        email: "dada",
        password: "dada",
        oras: "dada",
        numeCaracter: "dada",
        numarTelefon: "dada",
        dataNasterii: "dada"


    }

    constructor(public navCtrl: NavController, public params: NavParams) {
        this.user = params.get("user");
        console.log("Primit in register calling: " + this.user.email);
    }
    showInfoAlchemist() {

        this.navCtrl.push(RegisterCallingCharacterPage, { user: this.user, chemare: 'alchemist' });

    }

    showInfoLuptator() {

        this.navCtrl.push(RegisterCallingCharacterPage, { user: this.user, chemare: 'luptator' });

    }

    showInfoAgricultor() {

        this.navCtrl.push(RegisterCallingCharacterPage, { user: this.user, chemare: 'agricultor' });

    }
    showInfoExplorator() {

        this.navCtrl.push(RegisterCallingCharacterPage, { user: this.user, chemare: 'explorator' });

    }

}
