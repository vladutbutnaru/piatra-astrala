import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(private alertController: AlertController, public navCtrl: NavController, public http: Http) {

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



    if (this.user.email == "admin" && this.user.password == "admin") {

      this.navCtrl.push(TabsPage, { email: this.user.email });
    }
    else {

      this.showAlert();

    }


  }

  goToRegister() {
    this.navCtrl.push(RegisterPage);


  }



  verifyLogin() {
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    var data = 'email=' + this.user.email + '&password=' + this.user.password;

    this.http.post("http://192.168.1.172:8080/players/v1/login", data, options)
      .subscribe(data => {
        console.log(data['_body']);
        if (data['_body'] == "1")
          this.navCtrl.push(TabsPage, { email: this.user.email });
        else
          this.showAlert();
      }, error => {
        console.log(error);// Error getting the data
      });


  }










}







