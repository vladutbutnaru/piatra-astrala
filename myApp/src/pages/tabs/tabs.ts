import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NavController, NavParams} from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

tab1Root = HomePage;
public tab2Root;
public tab3Root;
public emailParam:any;
    
constructor(public navCtrl: NavController, public params:NavParams) {
    this.emailParam= params.get("email");
    console.log("Primit in tabs: " + this.emailParam);
    

   this.tab2Root = AboutPage;
   this.tab3Root = ContactPage;
  }
    
    
    
    
}