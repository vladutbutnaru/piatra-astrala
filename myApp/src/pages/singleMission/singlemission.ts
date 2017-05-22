import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
  selector: 'page-single-mission',
  templateUrl: 'singlemission.html'
})
export class SingleMissionPage {
  public misiune = {
    titlu: "test misiune",
    npc: "Gigel Frone",
    descriere: 'E un fapt bine stabilit că cititorul va fi sustras de conţinutul citibil al unei pagini atunci când se uită la aşezarea în pagină. Scopul utilizării a Lorem Ipsum, este acela că are o distribuţie a literelor mai mult sau mai puţin normale, faţă de utilizarea a caaeva de genul "Conţinut aici, conţinut acolo", făcându-l să arate ca o engleză citibilă. Multe pachete de publicare pentru calculator şi editoare de pagini web folosesc acum Lorem Ipsum ca model standard de text, iar o cautare de "lorem ipsum" va rezulta în o mulţime de site-uri web în dezvoltare. Pe parcursul anilor, diferite versiuni au evoluat, uneori din intâmplare, uneori intenţionat (infiltrându-se elemente de umor sau altceva de acest gen).'

  };
  constructor(public navCtrl: NavController) {

  }

}