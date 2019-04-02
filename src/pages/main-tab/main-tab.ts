import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BalancePage } from '../balance/balance';
import { TransPage } from '../trans/trans';
import { ExpensePage } from '../expense/expense';
import { MePage } from '../me/me';
import { SignedPage} from "../signed/signed";
import { PositionPage} from "../position/position";
import { PreferencePage} from "../preference/preference";

@Component({
  selector: 'page-main-tab',
  templateUrl: 'main-tab.html'
})
export class MainTabPage {

  tab1Root: any = SignedPage;
  tab2Root: any = BalancePage;
  tab3Root: any = ExpensePage;
  tab4Root: any = PreferencePage;
  tab5Root: any = MePage;
  tab6Root: any = PositionPage;

  constructor(public navCtrl: NavController) {

  }

}
