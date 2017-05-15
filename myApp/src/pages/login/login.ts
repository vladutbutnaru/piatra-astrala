import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import {RegisterPage} from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private alertController: AlertController, public navCtrl: NavController ) {

  }
  user = {
      email: '',
      password: ''
      
  }

    
     showAlert() {
    let alert = this.alertController.create({
      title: 'Date incorecte!',
      subTitle: 'Datele introduse sunt incorecte! Incearca din nou.',
      buttons: ['OK']
    });
    alert.present();
  }
    
    testLogin() {
  
  
   
if(this.user.email == "admin" && this.user.password =="admin"){

    this.navCtrl.push(TabsPage, {email: this.user.email});
    }
else{
    
     this.showAlert();
    
}
   
    
}
    
goToRegister(){
     this.navCtrl.push(RegisterPage);
    
    
}

}






 
