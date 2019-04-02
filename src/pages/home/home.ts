import { Component } from '@angular/core';
import { Response} from '@angular/http';
import {NavController, NavParams, ToastController, App, AlertController, LoadingController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import '../../object/functionInterface';
import {FunctionInterface} from "../../object/functionInterface";
import {MainTabPage} from "../main-tab/main-tab";
import {AppGlobal} from "../../app/app.global";
import {BankCardBrief} from "../../object/bankCard";
import {NewcardPage} from "../newcard/newcard";
import {NameAndPassword, User, EmailAndPassword} from "../../object/userinfo";
import {RegexValidator} from "../../object/regexValidator";
import {SignedPage} from "../signed/signed"
 export var nam = "";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private name : string = "";
  private psw : string = "";
  private signInStateEnable : boolean = true;
  private signUpStateEnable : boolean = true;

  private global : AppGlobal;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl : ToastController,
    private functionInterface : FunctionInterface,
    private alertCtrl : AlertController,
    private loadingControl : LoadingController
  ) {
    this.signInStateEnable = true;
    this.signUpStateEnable = true;
	
    this.global = AppGlobal.getInstance();
  }

  private resetAllState(){
    this.signInStateEnable = true;
    this.signUpStateEnable = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  signIn(){
	  
    let user = this.generateUserObjSimple();
    let isLogingIn = true;
    let logInOkay = false;
    let instance = AppGlobal.getInstance();
	
	let loader = this.loadingControl.create({
      content : "Log in...",
      duration : 10000,
      dismissOnPageChange : true
    });
    loader.present();
    
	//登录
    let reply = this.functionInterface.LogIn(JSON.stringify(user));
    reply.toPromise()
      .then(response => {
        //记录Userid 和 token
        let responseObj = JSON.parse(response.text());
        instance.token = responseObj.id;
        instance.userid = responseObj.userId;
        console.log('token:' + instance.token);
        console.log('id:' + instance.userid);
		
        logInOkay = true;
        isLogingIn = false;
		this.queryCards();
		loader.dismiss();
      }).catch(error => {
        this.showAlert(error.statusText, "Something goes wrong during log in.");
        isLogingIn = false;
        logInOkay = false;
		loader.dismiss();
      });


	  /*
    //add a timer and show the logging page.
    let time = 100;
    let timer = setInterval(() => {
      time --;
      console.log(time);
      if(time == 0 || isLogingIn == false){
        clearInterval(timer);

        if(logInOkay){
          this.queryCards();
        }
      }
    }, 200);
	*/
	
	//this.navCtrl.push(MainTabPage);
  }

  private queryCards(){
    let instance = AppGlobal.getInstance();
    let isQuerying = true;
    let queryOkay = false;

    let reply = this.functionInterface.GetAllCards(instance.userid, instance.token);
    reply.toPromise()
      .then(responce => {
        this.parseCardsMsg(responce.text());
        queryOkay = true;
        isQuerying = false;
		this.queryOrders();
      }).catch(error => {
        this.showAlert(error.statusText, error.text().substring(0, 50));
        queryOkay = false;
        isQuerying = false;
    });
  }

  private queryOrders(){
    let instance = AppGlobal.getInstance();	
    let isQuerying = true;
    let queryOkay = false;

    let reply = this.functionInterface.QueryOrder(instance.userid, instance.token);
    reply.toPromise()
      .then(responce => {
        instance.myProducts = JSON.parse(responce.text());
        queryOkay = true;
        isQuerying = false;
      }).catch(error => {
      this.showAlert(error.statusText, error.text().substring(0, 50));
      queryOkay = false;
      isQuerying = false;
    });
nam=this.name;
	this.navCtrl.push(MainTabPage);
	
	/*
    let time = 100;
    let timer = setInterval(() => {
      time --;
      console.log(time);
      if(time == 0 || isQuerying == false){
        clearInterval(timer);

        if(queryOkay){
          this.navCtrl.push(MainTabPage);
        }
      }
    }, 200);
	*/
  }
  
  signUp(){
    this.navCtrl.push(RegisterPage);
  }

  private parseCardsMsg(msg : string){
    let responseObj = JSON.parse(msg);
    let instance = AppGlobal.getInstance();
    //record cards information
    for(let c of responseObj){
      let newCard = new BankCardBrief();
      newCard.bank = c.bank;
      newCard.card_num = c.card_num;
      instance.bankCards.push(newCard);
    }
  }

  private generateUserObj() : User{
    let user : User = null;

    if(RegexValidator.isLegalEmail(this.name)){
      user = new EmailAndPassword(this.name, this.psw);
    } else if(RegexValidator.isLegalUsername(this.name)){
      user = new NameAndPassword(this.name, this.psw);
    }else{
      this.showAlert("username or email is invalid", "");
      this.name = "";
    }
    return user;
  }

  private generateUserObjSimple() : User{
    let user : NameAndPassword = null;

    user = new NameAndPassword(this.name, this.psw);

    return user;
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
