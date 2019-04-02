import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {FunctionInterface} from "../../object/functionInterface";
import {AppGlobal} from "../../app/app.global";

/*
  Generated class for the Trans page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trans',
  templateUrl: 'trans.html'
})
export class TransPage {

  private history : Array<any> = new Array();
  private card : string = "all";
  private startdate : string = "";
  private enddate : string = "";
  private cards;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl : ToastController,
    private functionInterface : FunctionInterface,
    private alertCtrl : AlertController,
    private loadingControl : LoadingController
  ) {
    this.cards = AppGlobal.getInstance().bankCards;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransPage');
  }

  private query(){
    let instance = AppGlobal.getInstance();

    if(this.startdate == "" || this.enddate == ""){
      this.popToast("Please select date range.");
    }
    else{
      let queryLoader = this.loadingControl.create({
        content : "Querying...",
        duration : 10000,
        dismissOnPageChange : true
      });

      queryLoader.present();
      let isQuerying = true;
      let queryOkay = false;

      let start = this.dateFormate(this.startdate);
      let end = this.dateFormate(this.enddate);
      let response;
      if(this.card == "all"){
        response = this.functionInterface.QueryAllHistory(instance.userid, instance.token
          , start, end);
      }else{
        response = this.functionInterface.QuerySingleHistory(instance.userid, instance.token
          , this.card, start, end);
      }

      response.toPromise()
        .then(responce => {
          this.history = JSON.parse(responce.text()).history;
          queryOkay = true;
          isQuerying = false;
          queryLoader.dismiss();
        }).catch(error => {
        this.showAlert(error.statusText, error.text());
          queryOkay = false;
          isQuerying = false;
          queryLoader.dismiss();
      });
	  
    }
  }
  
  public star_format(cardnum : string){
	let res = "";
	if(cardnum.length >= 8){
		res += cardnum.substring(0,4);
		for(var i = 4;i < cardnum.length-4;i ++)
			res += '*';
		res += cardnum.substring(cardnum.length-4,cardnum.length);
	}
	console.log(res);
	return res;
  }
  
  private dateFormate(date : string) : string{
    return date.replace('-', '').replace('-', '');
  }
  
  private dayFormat(date : string){
	let showdate = "";
	if(date.length>=8){
		showdate = date.substring(0,4) + "-" + date.substring(4,6) + "-" + date.substr(6);
	}
	return showdate;
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
