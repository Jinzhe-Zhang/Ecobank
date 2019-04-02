import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {StorageService} from "../../object/storageService";
import {HomePage} from "../home/home";
import {FunctionInterface} from "../../object/functionInterface";
import {Product} from "../../object/product";
import {Privilege} from "../../object/privilege"
import {OrderPrivilegePage} from "../order-privilege/order-privilege";
import {BankCard, BankCardBrief} from "../../object/bankCard";
import {AppGlobal} from "../../app/app.global";
import {Http} from "@angular/http";
import { BarcodeScanner } from "ionic-native";


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  private totalAsset : number = 0;
  private totalDebt : number = 0;
  private totalNet : number = 0;
  private cards : BankCardBrief[];
  private payment : string;
  private shopname : string;
  private poiid : string; 
  private isLoading = false;

  private global : AppGlobal;

  constructor(public navCtrl: NavController
      , public navParams: NavParams
      , public toastCtrl : ToastController
      , private alertCtrl : AlertController
      , public functionInterface : FunctionInterface
      , private  http : Http) {

    this.global = AppGlobal.getInstance();
    this.shopname = navParams.get("merchantType");
    this.dataInit();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardsPage');
  }

  private findDiscount(){
    if (this.payment) {
       if (parseInt(this.payment) < 0 ) {
       this.showAlert("Error input","your payment can not be minus");
       return;
        }
       this.navCtrl.push(OrderPrivilegePage, {
		   shopname : this.shopname,
		   payment : this.payment,
		   poiid : this.poiid
       })
    }
    else{
      this.showAlert("Error input","your payment can not be blank");
      return;
    }

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
  
  public scanQR() {
    BarcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);
	  //格式 {"text":"xxx","format":"QR_CODE","cancelled":false}
	  let stext = JSON.stringify(barcodeData);
	  let q1 = stext.indexOf(":");
	  stext = stext.substr(q1+2);
	  let q2 = stext.indexOf(",")
	  stext = stext.substr(0,q2-1);
	  let q3 = stext.indexOf("~"); // 用波浪号分割
	  this.shopname = stext.substring(0,q3);
	  stext = stext.substr(q3+1);
	  let q4 = stext.indexOf("~");
	  this.poiid = stext.substring(0,q4);
	  this.payment = stext.substr(q4+1);	  
	  
	  this.findDiscount();
	}, (err) => {
      console.log(err);
    });
  }
  
}
