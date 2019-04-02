import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BankCard } from '../../object/bankCard';
import { NewcardPage} from "../newcard/newcard";

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})
export class ManagePage {

  bankCards : Array<BankCard>;

  constructor(public navCtrl: NavController, public navParams: NavParams){
    this.bankCards = new Array<BankCard>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManagePage');
  }

  addNewcard(){
    this.navCtrl.push(NewcardPage);
  }
}
