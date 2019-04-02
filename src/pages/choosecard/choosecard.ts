import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController} from 'ionic-angular';
import { FunctionInterface } from "../../object/functionInterface";
import { AppGlobal } from "../../app/app.global";
import { BankCardBrief} from "../../object/bankCard";

@Component({
  selector: 'page-choosecard',
  templateUrl: 'choosecard.html'
})
export class ChooseCardPage {
  private cards : BankCardBrief[];
  private poiid : string;
  private shopname : string;
  private bankname : string;
  private amount_paid : string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
	public toastCtrl: ToastController,
    private functionInterface : FunctionInterface,
    private alertCtrl : AlertController,
  ) {
	  this.cards = new Array<BankCardBrief>();
      this.poiid = this.navParams.get("poiid");
	  this.shopname = this.navParams.get("shopname");
	  this.bankname = this.navParams.get("bankname");
	  this.amount_paid = this.navParams.get("amount_paid");
	  this.filter();
	  console.log(this.cards);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseCardPage');
  }
  
  filter(){
	let oricards = AppGlobal.getInstance().bankCards;
	for(var i=0;i<oricards.length;i++){
		if(oricards[i].bank.toUpperCase() == this.bankname){
			this.cards.push(oricards[i]);
		}
	}
  }
  
  
  private pay(cardnum)	{
	let pwd : string = "";
	pwd = window.prompt("Input password:\n",""); 
	//alert(pwd);
	let instance = AppGlobal.getInstance();
	let response = this.functionInterface.Pay(instance.userid,instance.token,cardnum,pwd,this.shopname,this.poiid,this.amount_paid);
	//let response = this.functionInterface.Pay(instance.userid,instance.token,cardnum,this.shopname,this.poiid,this.amount_paid);
	response.toPromise()
        .then(responce => {
			let res = JSON.parse(responce.text()).data;
			if(res.ca_return_code == "3"){
				this.navCtrl.pop();
				this.navCtrl.pop();
				this.showAlert("Pay successfully","Deposit:"+res.balance_before+" -> "+res.balance_after);
			}else{
				this.showAlert("Error",res.pay_response_message);
			}
			console.log(res);
        }).catch(error => {
        this.showAlert("Pay error",error.statusText);
		});
	return response;
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
