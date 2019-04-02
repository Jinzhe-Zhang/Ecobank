import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {StorageService} from "../../object/storageService";
import {HomePage} from "../home/home";
import {FunctionInterface} from "../../object/functionInterface";
import {Product} from "../../object/product";
import {Privilege} from "../../object/privilege"
import {BankCard, BankCardBrief} from "../../object/bankCard";
import {WarningPage} from "../warning/warning";
import {AppGlobal} from "../../app/app.global";
import {Http} from "@angular/http";

/*
  Generated class for the Signed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {

  private deposit : number = 0;
  private debt : number = 0;
  private overdraw : number = 0;
  private cards : BankCardBrief[];

  private isLoading = false;

  private global : AppGlobal;

  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public toastCtrl : ToastController
      , private alertCtrl : AlertController
      , public functionInterface : FunctionInterface
      , private  http : Http) {

    this.global = AppGlobal.getInstance();
    this.dataInit();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }

  private popToast(msg : string){
    let myToast = this.toastCtrl.create({
      message : msg,
      duration : 1000,
      showCloseButton : true,
      position : "bottom"});
    myToast.present();
  }

  private dataInit(){
    this.cards = AppGlobal.getInstance().bankCards;
  }


  private showAlert(title : string, msg : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
