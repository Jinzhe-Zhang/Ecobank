import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {Product, OrderItem} from "../../object/product";
import {FunctionInterface} from "../../object/functionInterface";
import {AppGlobal} from "../../app/app.global";

@Component({
  selector: 'page-order-product',
  templateUrl: 'order-product.html'
})
export class OrderProductPage {
  private product : Product = null;
  private money : string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingControl : LoadingController,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private functionInterface : FunctionInterface
  ) {
    this.product = navParams.get("product");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderProductPage');
  }

  private cancel(){
    this.navCtrl.pop();
  }

  private buyProduct(orderid : string, money : string) {
    try {
      let moneyNumber = Number.parseFloat(money);

     // let order : OrderItem = new OrderItem(moneyNumber, orderid);

      let instance = AppGlobal.getInstance();

      let queryLoader = this.loadingControl.create({
        content : "Processing...",
        duration : 10000,
        dismissOnPageChange : true
      });
	  
      queryLoader.present();
      let isQuerying = true;
      let queryOkay = false;
	  
	  var myDate = new Date();
	  var time_str = ""+myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate()+"-"+myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
	 
	  let order = {
		"held_investment": moneyNumber,
		"held_product_id": orderid,
		"order_date": time_str,
		"id": instance.token,
		"userid": instance.userid		
	  }

      let reply = this.functionInterface.orderProduct(instance.userid, instance.token, JSON.stringify(order));

      reply.toPromise()
        .then(responce => {
		  instance.myProducts.push(JSON.parse(responce.text()));
          queryOkay = true;
          isQuerying = false;
          queryLoader.dismiss();
		  if(queryOkay){
            this.popToast("Success!");
            this.navCtrl.pop();
          }
        }).catch(error => {
        this.showAlert(error.statusText, error.text().substring(0,100));
        queryOkay = false;
        isQuerying = false;
        queryLoader.dismiss();
      });
      
	  /*
      let time = 100;
      let timer = setInterval(() => {
        time --;
        console.log(time);
        if(time == 0 || isQuerying == false){
          clearInterval(timer);
          //alert("asdasd");
          if(queryOkay){
            this.popToast("success!");
            this.navCtrl.pop();
          }
        }
      }, 200);
      */
    } catch (e) {
      this.showAlert("Error", "Investment must be a number.");
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

  private popToast(msg : string){
      let myToast = this.toastCtrl.create({
        message : msg,
        duration : 1000,
        showCloseButton : true,
        position : "bottom"});
      myToast.present();
  }

}
