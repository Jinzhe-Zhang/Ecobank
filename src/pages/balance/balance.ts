import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {BankCardBrief} from "../../object/bankCard";
import {AppGlobal} from "../../app/app.global";
import {FunctionInterface} from "../../object/functionInterface";
import {BalanceModel} from "../../object/balanceModel";
import {Response} from "@angular/http";

/*
  Generated class for the Blance page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-balance',
  templateUrl: 'balance.html'
})
export class BalancePage {
  private cards;
  private selectCardNum : string = "all";
  private bankName = "";
  private asset;
  private overdraft;
  private deposit;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private alertCtrl : AlertController,
    private functionInterface : FunctionInterface,
    private loadingControl : LoadingController
  ) {
    this.dataInit();
  }

  private dataInit(){
    this.cards = AppGlobal.getInstance().bankCards;
    let instance = AppGlobal.getInstance();
    let reply;
    let queryLoader = this.loadingControl.create({
      content : "Processing...",
      duration : 10000,
      dismissOnPageChange : true
    });
    reply = this.functionInterface.GetAllBalance(instance.userid,instance.token);
    queryLoader.present() ;
    reply.toPromise()
      .then(responce => {
        queryLoader.dismiss();
        var responseObj = JSON.parse(responce.text());
        this.bankName = responseObj.balance.bank;
        this.deposit = responseObj.balance.asset;
        this.asset = responseObj.balance.net;
        this.overdraft = responseObj.balance.debt;
        this.popToast("Query successfully");
      })
  }

  public star_format(cardnum : string){
	let res = "";
	if(cardnum.length >= 8){
		res += cardnum.substring(0,4);
		for(var i = 4;i < cardnum.length-4;i ++)
			res += '*';
		res += cardnum.substring(cardnum.length-4,cardnum.length);
	}
	return res;
  }

  cardSelectChanged(){
    let instance = AppGlobal.getInstance();
    let queryLoader = this.loadingControl.create({
      content : "Processing...",
      duration : 10000,
      dismissOnPageChange : true
    });

    let reply;
    if(this.selectCardNum == "all"){
      reply = this.functionInterface.GetAllBalance(instance.userid, instance.token);
    }
    else{
      reply = this.functionInterface.GetSingleBalance(instance.userid, instance.token, this.selectCardNum);
    }

    queryLoader.present();
    reply.toPromise()
      .then(responce => {
        queryLoader.dismiss();
        var responseObj = JSON.parse(responce.text());
        this.bankName = responseObj.balance.bank;
        this.deposit = responseObj.balance.asset;
		this.asset = responseObj.balance.net;
		this.overdraft = responseObj.balance.debt;
        this.popToast("Query successfully");
      }).catch(error => {
        this.showAlert(error.statusText, "Something goes wrong");
        queryLoader.dismiss();
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad BalancePage');
  }


  private popToast(msg : string){
    let myToast = this.toastCtrl.create({
      message : msg,
      duration : 1000,
      showCloseButton : true,
      position : "bottom"});
    myToast.present();
  }


  private showAlert(title : string, msg : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  private getStubData(path : string) : string{
    return "test"
  }
}
