import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import {Userinfo} from "../../object/userinfo";
import {FunctionInterface} from "../../object/functionInterface";
import {Response} from "@angular/http";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  password : string = "";
  username : string = "";
  email : string = "";
  confirm : string = "";
  agreed : boolean = false;

  private loader : any = null;

  private isRegister : boolean = false;
  private registerOkay : boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private functionInterface : FunctionInterface,
    private toastCtrl : ToastController,
    private alertCtrl : AlertController,
    private loadingControl : LoadingController)
  {
    this.loader = this.loadingControl.create({
      content : "log in...",
      duration : 10000,
      dismissOnPageChange : true
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  checkPassword(){
    if(this.password != this.confirm
      && this.password.length != 0
      && this.confirm.length != 0){
      this.popToast("password discrepancy");
    }
  }

  checkListIsLegal() : boolean{
        if (this.username.length == 0) {
            this.popToast("username cannot be blank");
        }
        else if (this.email.length == 0) {
            this.popToast("email cannot be blank");
        }
        else if (!this.email.match(/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/))
        {
            this.popToast("email format error");
        }
        else if (String(this.password).length == 0) {
            this.popToast("password cannot be blank");
        }
         else if (!String(this.password).match(/\S{6,}/))
        {
            this.popToast("password must be consist of more than 6 elements which are letters,numbers or symbols.");
        }
        else if (this.password != this.confirm) {
            this.popToast("password discrepancy");
        }
        else if (!this.agreed) {
            this.popToast("you need to agree terms");
        }
        else {
            return true;
        }
        return false;
  }

  //todo: use Regex to check username and email's legitimacy.

  submitButtonClick(){
    if(this.checkListIsLegal()){

      this.loader.present();
      this.isRegister = true;
      this.registerOkay = false;

      let user = new Userinfo(this.username, this.password, this.email); 
      let reply = this.functionInterface.SignUp(JSON.stringify(user)); ////////////???

      reply.toPromise().then(response => {
        this.registerOkay = true;
        this.isRegister = false;
        this.loader.dismiss();
		if(this.registerOkay){
			this.popToast("Register successfully!");
		}
      }).catch(error => {
        this.showAlert(error.statusText, error.text());
        this.registerOkay = false;
        this.isRegister = false;
        this.loader.dismiss();
      });
	  
	  this.navCtrl.pop();
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

  private signUpErrorHandler(error : Response){
    let message : string = "Unknown Error.";
    console.log(error.statusText);
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
