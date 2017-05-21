import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { RegisterCallingPage } from '../pages/registerCalling/registerCalling';
import { RegisterCallingCharacterPage } from '../pages/registerCallingCharacter/registerCallingCharacter';
import { RadarPage } from '../pages/radar/radar';

import { MissionsPage } from '../pages/missions/missions';
import { SingleMissionPage } from '../pages/singleMission/singlemission';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';

import { EscapeHtmlPipe } from '../pipes/keep-html.pipe';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
      RegisterPage,
      RegisterCallingPage,
      RegisterCallingCharacterPage,
      RadarPage,
       EscapeHtmlPipe,
      MissionsPage,
      SingleMissionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
      RegisterPage,
      RegisterCallingPage,
      RegisterCallingCharacterPage,
      RadarPage,
      MissionsPage,
      SingleMissionPage
  
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
