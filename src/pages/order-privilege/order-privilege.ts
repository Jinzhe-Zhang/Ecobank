import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, ToastController, LoadingController} from 'ionic-angular';
import {Privilege} from "../../object/privilege";
import {FunctionInterface} from "../../object/functionInterface";
import {AppGlobal} from "../../app/app.global";
import {ChooseCardPage} from "../choosecard/choosecard";

@Component({
  selector: 'page-order-privilege',
  templateUrl: 'order-privilege.html'
})
export class OrderPrivilegePage {
  private privileges : Privilege[];
  private shopname : string;
  private payment : string;
  private poiid : string;
  private isLoading = false;
  private priAct  = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingControl : LoadingController,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private functionInterface : FunctionInterface
  ) {
	this.privileges  = new Array<Privilege>();
    this.shopname = navParams.get("shopname");
	this.payment = navParams.get("payment");
	this.poiid = navParams.get("poiid");
    this.findDis();
	//this.refreshPrivilege();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPrivilegePage');
  }

  private cancel(){
    this.navCtrl.pop();
  }

  private clickPri(){
    if (this.priAct == false) {
      this.priAct = true;
    }
    else{
      this.priAct = false;
    }
  }

  
  private findDis(){
      let instance = AppGlobal.getInstance();
	  let response = this.functionInterface.FindDisc(instance.userid, instance.token, this.shopname, this.poiid, this.payment);
	  
	  response.toPromise()
        .then(responce => {
		let a = JSON.parse(responce.text());
		for(var i =0;i<a.length;i++){
			let pri = new Privilege();
			pri.bank_id = a[i].bankid;
			pri.privilege_type = a[i].privilegetype_o;
			pri.amount_paid = a[i].amount_paid;
			pri.detail1 = a[i].detail1_o;
			pri.detail2 = a[i].detail2_o;
			pri.detail3 = a[i].detail3_o;
			pri.bank_name = a[i].bankname.toUpperCase();
			if(parseFloat(this.payment) > parseFloat(a[i].amount_paid))  //这里把无优惠也筛去了
				this.privileges.push(pri);
		}
		for(var i=0;i<this.privileges.length;i++){
			for(var j=0;j<this.privileges.length-i-1;j++){
				if(this.privileges[j].amount_paid > this.privileges[j+1].amount_paid){
					let pri = new Privilege();
					
					pri.bank_id = this.privileges[j].bank_id;
					pri.privilege_type = this.privileges[j].privilege_type;
					pri.amount_paid = this.privileges[j].amount_paid ;
					pri.detail1 = this.privileges[j].detail1;
					pri.detail2 =this.privileges[j].detail2;
					pri.detail3 = this.privileges[j].detail3;
					pri.bank_name = this.privileges[j].bank_name;
									
					this.privileges[j].bank_id = this.privileges[j+1].bank_id;
					this.privileges[j].privilege_type = this.privileges[j+1].privilege_type;
					this.privileges[j].amount_paid = this.privileges[j+1].amount_paid;
					this.privileges[j].detail1 = this.privileges[j+1].detail1;
					this.privileges[j].detail2 = this.privileges[j+1].detail2;
					this.privileges[j].detail3 = this.privileges[j+1].detail3;
					this.privileges[j].bank_name = this.privileges[j+1].bank_name;
					
					this.privileges[j+1].bank_id = pri.bank_id;
					this.privileges[j+1].privilege_type = pri.privilege_type;
					this.privileges[j+1].amount_paid = pri.amount_paid;
					this.privileges[j+1].detail1 = pri.detail1;
					this.privileges[j+1].detail2 = pri.detail2;
					this.privileges[j+1].detail3 = pri.detail3;
					this.privileges[j+1].bank_name = pri.bank_name;
				}
			}
		}
		let orange_add = 0; 
		let coconut_add = 0;
		for(var i=0;i<this.privileges.length;i++){
			if(this.privileges[i].bank_name == 'ORANGE')
				orange_add = 1;
			else if(this.privileges[i].bank_name == 'COCONUT')
				coconut_add = 1;
		}
		
		if(orange_add == 0){
			let pri = new Privilege();
			pri.privilege_type = "0";
			pri.amount_paid = this.payment;
			pri.detail1 = "0";
			pri.detail2 = "0";
			pri.detail3 = "0";
			pri.bank_id = "000002";
			pri.bank_name = "ORANGE";
			this.privileges.push(pri);
		}
		if(coconut_add == 0){
			let pri = new Privilege();
			pri.privilege_type = "0";
			pri.amount_paid = this.payment;
			pri.detail1 = "0";
			pri.detail2 = "0";
			pri.detail3 = "0";
			pri.bank_id = "000001";
			pri.bank_name = "COCONUT";
			this.privileges.push(pri);
		}
	  }).catch(error => {
	    this.showAlert("Don't get the JSON",error.statusText);
      });
	return response;
  }

  
  private choosepri(money:string,bankname:string){
	this.navCtrl.push(ChooseCardPage,{
		poiid : this.poiid,
		shopname : this.shopname,
		bankname : bankname,
		amount_paid : money
	});

	//  let response = this.functionInterface.Pay(instance.userid, instance.token, bankid,this.shopname,this.poiid,money);
  }
 /*
  private parsePrivilege(msg : string){
    this.privileges = new Array<Privilege>();
    let priData = JSON.parse(msg);
    for(let p of priData.privilege_list){
      if (p.merchant_type == this.shopname) {
      let newPri = new Privilege(p.privilege_id,p.bank_id,p.bank_name,p.merchant_type,p.start_date,p.end_date,p.privilege_type,p.privilege_detail);
      this.privileges.push(newPri);    
      }
    }
  }

  private refreshPrivilege(){
    this.isLoading = true;
    this.privileges = new Array<Privilege>();
    this.parsePrivilege(AppGlobal.getInstance().cachePrivilege);
    this.isLoading = false;
  }
*/


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
