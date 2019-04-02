import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {StorageService} from "../../object/storageService";
import {MyApp} from "../../app/app.component";
import {HomePage} from "../home/home";
import {FunctionInterface} from "../../object/functionInterface";
import {Product} from "../../object/product";
import {Privilege} from "../../object/privilege"
import {BankCard, BankCardBrief} from "../../object/bankCard";
import {AppGlobal} from "../../app/app.global";
import {OrderProductPage} from "../order-product/order-product";
import {OrderPrivilegePage} from "../order-privilege/order-privilege";
import {RecommendPage} from "../recommend/recommend";
import {PaymentPage} from "../payment/payment";
import {Http} from "@angular/http";

/*
  Generated class for the Signed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signed',
  templateUrl: 'signed.html'
})
export class SignedPage {

  private totalAsset : number = 0;
  private totalDebt : number = 0;
  private totalNet : number = 0;
  private products : Product[];
  private shops    : string[];
  private privileges : Privilege[];
  private cards : BankCardBrief[];
  private scannedText : string;
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
    this.dataInit();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignedPage');
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
    this.refreshProducts();
    // this.refreshPrivilege();
  }

  private praseProducts(msg : string){
    this.products = new Array<Product>();
    let productData = JSON.parse(msg);
    for(let p of productData.products.product_list){
      let newProduct = new Product(p.purchase_entry, p.earning_rate, p.risk_type, p.product_id, p.hold_time, p.product_name);
      this.products.push(newProduct);
    }
  }

  private orderFormat(order:string){
	let res = order.substring(0,1) + order.substr(1).toLowerCase();
	return res;	
  }
  
  // private scanQR(){
  //   console.log("Scanned");
  //   BarcodeScanner.scan().then((barcodeData) =>{
  //     if (barcodeData.cancelled) {
  //       console.log("User cancelled the action");
  //       return false;
  //     }
  //     console.log("Scanned successfully!");
  //     this.scannedText=JSON.stringify(barcodeData);
  //   },(err) => {
  //     this.showAlert("Scann Error",err);
  //   });
  // }

  // private parsePrivilege(msg : string){
  //   this.privileges = new Array<Privilege>();
  //   this.shops = new Array<string>();
  //   let priData = JSON.parse(msg);
  //   for(let p of priData.privilege_list){
  //     let newPri = new Privilege(p.privilege_id,p.bank_id,p.bank_name,p.merchant_type,p.start_date,p.end_date,p.privilege_type);
  //     this.privileges.push(newPri);
  //     let flag = true;
  //     let str = p.merchant_type;
  //     for(let s of this.shops){
  //       if (s == str) {//check if the shop already existed
  //         flag = false;
  //       }
  //     }
  //     if (flag) {
  //       this.shops.push(str);
  //     }
  //   }

  // }

  private clickProduct(product: Product){
    this.popToast(product.product_name);
    this.navCtrl.push(OrderProductPage, {
      product: product
    });
  }

  private clickMerchant(merchantType : string){
    this.popToast(merchantType);
    this.navCtrl.push(OrderPrivilegePage, {
      merchantType : merchantType
    })
  }

  private To_Recommend(){
    this.navCtrl.push(RecommendPage)
  }

  private To_Pay(){
    this.navCtrl.push(PaymentPage)
  }

  private refreshProducts(){

    this.isLoading = true;

    this.products = new Array<Product>();
    //this.praseProducts(AppGlobal.getInstance().cacheProducts);

    this.isLoading = false;
	
    let reply = this.functionInterface.QueryProducts(this.global.token);
    reply.toPromise()
      .then(response => {
        this.praseProducts(response.text());
      }).catch(error => {
        this.showAlert(error.statusText, error.statusText);
    });
    
  }

  // private refreshPrivilege(){
  //   this.isLoading = true;
  //   this.privileges = new Array<Privilege>();
  //   this.parsePrivilege(AppGlobal.getInstance().cachePrivilege);
  //   // for(let p of this.privileges){
  //   //   // let flag = false;
  //   //   // let str = {p.merchant_type};
  //   //   // for(let s of this.shops){
  //   //   //   if (s == str) {//check if the shop already existed
  //   //   //     break;
  //   //   //   }
  //   //   //   else{
  //   //   //     flag = true;
  //   //   //   }
  //   //   // }
  //   //   // if (flag) {
  //   //   //   this.shops.push(str);
  //   //   // }
  //   // }
  //   this.isLoading = false;
  // }

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

  private showAlert(title : string, msg : string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
}
