import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {NavController, NavParams, LoadingController, AlertController, ToastController} from 'ionic-angular';
import {HomePage,nam} from "../home/home";
import {ManagePage} from "../manage/manage";
import {BankCardBrief,BankCard} from "../../object/bankCard";
import {AppGlobal} from "../../app/app.global";
import {NewcardPage} from "../newcard/newcard";
import {MainTabPage} from "../main-tab/main-tab";
import {FunctionInterface} from "../../object/functionInterface";

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  private cards : BankCardBrief[];
  private deposit : number = 0;
  private overdraft : number = 0;
  private asset : number = 0;
  private orders : Array<any> = AppGlobal.getInstance().myProducts;
  private greeting : string = "Good morning";
  private username : string = "Xiaoming";
 public activities: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingControl : LoadingController,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private functionInterface : FunctionInterface)

  {

    this.activities=[{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      },{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      },{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      },{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      },{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      },{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      },{
        Name:"Agricultural Bank weekly brush",
        description : "A total of $199 per week. Can be awarded accordingly.",
        Stoppingtime: "2017-12-24",
        Srate:3,
        Brate:4,
        Unit:"week",
        Award:[
            {Bcount:5,
        Scount:10,
        costTransaction:10000,
        Money:40000,
        isContinuity:false,
        Description:"60000积分",
        Extend:{}},{ 
        Bcount:"6",
        Scount:"5",
        costTransaction:"199",
        Money:"-1",
        isContinuity:"false", 
        Description:"铝框旅行箱",
        Extend:""
    }
]
      }];
    this.dataInit();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  logOut(){
    let instance = AppGlobal.getInstance();
    instance.token = "";
    instance.userid = "";
	window.location.reload();
  }

  private dataInit(){
  //  this.cards = AppGlobal.getInstance().bankCards;
  //  this.orders = AppGlobal.getInstance().myProducts;
    this.username=nam;
   var i = new Date().getHours();
   if(i>11 && i<18)
    this.greeting="Good afternoon";
  else if (i>17)
    this.greeting="Good evening";
  else if (i<4 )
    this.greeting="Good night";
	this.getBalance();
  }

  private getBalance(){
	this.cards = AppGlobal.getInstance().bankCards;
	let instance = AppGlobal.getInstance();
	let reply = this.functionInterface.GetAllBalance(instance.userid, instance.token);
/*    reply.toPromise()
      .then(responce => {
        var responseObj = JSON.parse(responce.text());
        this.deposit = responseObj.balance.asset;
		this.asset = responseObj.balance.net;
		this.overdraft = responseObj.balance.debt;
      }).catch(error => {
        this.showAlert(error.statusText, "Something goes wrong");
    });*/
  }

  private deleteCard(card_num){
	let res = window.confirm("Delete it?"+this.star_format(card_num));
	if(res == true){
		let instance = AppGlobal.getInstance();
		let queryLoader = this.loadingControl.create({
		  content : "Processing...",
		  duration : 10000,
		  dismissOnPageChange : true
		});

		queryLoader.present();

		let reply = this.functionInterface.DeleteCard(instance.userid, instance.token, card_num);
/*		reply.toPromise()
		  .then(responce => {
			instance.deleteCard(card_num);
			queryLoader.dismiss();
			this.popToast("Delete card successfully");
		  }).catch(error => {
			this.showAlert(error.statusText, error.text().substring(0,100));
			queryLoader.dismiss();
		});*/
		this.getBalance();
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
	return res;
  }

/*
  private deleteCard(card_num : string){
    let instance = AppGlobal.getInstance();

    let queryLoader = this.loadingControl.create({
      content : "send to server...",
      duration : 10000,
      dismissOnPageChange : true
    });

    queryLoader.present();

    let reply = this.functionInterface.DeleteCard(instance.userid, instance.token, card_num);
    reply.toPromise()
      .then(responce => {
        instance.deleteCard(card_num);
        queryLoader.dismiss();
        this.popToast("delete card successfully");
      }).catch(error => {
        this.showAlert(error.statusText, error.text().substring(0,100));
        queryLoader.dismiss();
    });
  }
*/
  private deleteOrder(orderId : string){
    let instance = AppGlobal.getInstance();

    let queryLoader = this.loadingControl.create({
      content : "Processing...",
      duration : 10000,
      dismissOnPageChange : true
    });

    queryLoader.present();

    let reply = this.functionInterface.DeleteOrder(instance.userid, instance.token, orderId);
/*    reply.toPromise()
      .then(responce => {
        instance.deleteOrder(orderId);
        queryLoader.dismiss();
        this.popToast("Delete order successfully");
      }).catch(error => {
      this.showAlert(error.statusText, error.text().substring(0,100));
      queryLoader.dismiss();
    });*/
  }
 private  cardli(){
    if(document.getElementById("cardlist-fold"))
    {
    document.getElementById("cardlist-fold").setAttribute('id','cardlist-deploy');
    document.getElementById("cardlisticond").style.opacity="1";
    document.getElementById("cardlisticonr").style.opacity="0";
    }
  else{
    document.getElementById("cardlist-deploy").setAttribute('id','cardlist-fold');
    document.getElementById("cardlisticond").style.opacity="0";
    document.getElementById("cardlisticonr").style.opacity="1";
  }
  }
   private  productli(){
    if(document.getElementById("productlist-fold"))
    {
    document.getElementById("productlist-fold").setAttribute('id','productlist-deploy');
    document.getElementById("productlisticond").style.opacity="1";
    document.getElementById("productlisticonr").style.opacity="0";
    }
  else{
    document.getElementById("productlist-deploy").setAttribute('id','productlist-fold');
    document.getElementById("productlisticond").style.opacity="0";
    document.getElementById("productlisticonr").style.opacity="1";
  }
  }
   private  myactivitiesli(){
    if(document.getElementById("myactivitieslist-fold"))
    {
    document.getElementById("myactivitieslist-fold").setAttribute('id','myactivitieslist-deploy');
    document.getElementById("myactivitieslisticond").style.opacity="1";
    document.getElementById("myactivitieslisticonr").style.opacity="0";
    }
  else{
    document.getElementById("myactivitieslist-deploy").setAttribute('id','myactivitieslist-fold');
    document.getElementById("myactivitieslisticond").style.opacity="0";
    document.getElementById("myactivitieslisticonr").style.opacity="1";
  }
  }
  manageCard(){
    this.navCtrl.push(NewcardPage);
	this.getBalance();
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
