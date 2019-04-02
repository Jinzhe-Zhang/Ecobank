import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {BankCard, BankCardList, BankCardBrief} from "../../object/bankCard";
import {AngularTools, AngularProfiler} from "@angular/platform-browser/src/browser/tools/common_tools";
import {Serializer} from "@angular/compiler";
import {FunctionInterface} from "../../object/functionInterface";
import {HomePage} from "../home/home";
import {AppGlobal} from "../../app/app.global";
import {MainTabPage} from "../main-tab/main-tab";
import {Response} from "@angular/http";

@Component({
  selector: 'page-newcard',
  templateUrl: 'newcard.html'
})
export class NewcardPage {

  public newCard : BankCard;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private functionInterface : FunctionInterface,
    private loadingControl : LoadingController
  ) {
    this.newCard = new BankCard();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewcardPage');
  }

  private loadInitData(){
  }

  submitClicked() {
    //check
    let instance = AppGlobal.getInstance();

    let queryLoader = this.loadingControl.create({
      content : "Processing...",
      duration : 10000,
      dismissOnPageChange : true
    });

    queryLoader.present();
    let isQuerying = true;
    let queryOkay = false;

    let reply = this.functionInterface.AddCard(instance.userid, instance.token, JSON.stringify(this.newCard));
    reply.toPromise()
      .then(responce => {
        instance.bankCards.push(this.newCard);
        queryOkay = true;
        isQuerying = false;
        queryLoader.dismiss();
        this.popToast("Add card successfully");
      }).catch(error => {
      this.showAlert(error.statusText, error.text());
      queryOkay = false;
      isQuerying = false;
      queryLoader.dismiss();
    });

    //add a timer and show the logging page.
    let time = 100;
    let timer = setInterval(() => {
      time --;
      console.log(time);
      if(time == 0 || isQuerying == false){
        clearInterval(timer);

        if(queryOkay){
          this.navCtrl.pop();
        }
      }
    }, 200);
  }

  private showAlert(title : string, msg : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  private popToast(msg : string){
    let myToast = this.toastCtrl.create({
      message : msg,
      duration : 1000,
      showCloseButton : true,
      position : "bottom"});
    myToast.present();
  }
}
