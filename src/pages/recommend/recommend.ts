import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FunctionInterface } from "../../object/functionInterface";
import { Privilege } from "../../object/privilege";
import { AppGlobal } from "../../app/app.global";
import { MerchantDetailPage } from "../merchantdetail/merchantdetail";
export var yourx;
export var youry;
@Component({
  selector: 'page-recommend',
  templateUrl: 'recommend.html'
})
export class RecommendPage {
   private key : string="";
   private result : any;
   private around_result : any;
   private photosrcs : string[];
   private resultnum : number = 1;
   private disa : string = "block";
   private disb : string = "none";
   private a : string = "display:none";
   //private map : any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl : ToastController,
    private functionInterface : FunctionInterface,
    private alertCtrl : AlertController
  ) {
	this.photosrcs = new Array<string>();
	this.getRecommend();
    yourx =116.408595;  //moodified
    youry = 40.005045;
  }

  public getRecommend(){
	this.disa = "block";
	this.disb = "none";
	let instance = AppGlobal.getInstance();
	let response = this.functionInterface.CmpRecommend(instance.userid, instance.token,"5");
	response.toPromise()
      .then(responce => {
	      this.result = JSON.parse(responce.text()).Recommandation;
		  this.around_result = null;
		  this.resultnum  = this.result.length;
		  console.log("this.result",this.result);
		  this.getphoto("0");
	  }).catch(error => {
	    this.showAlert("don't get the JSON",error.statusText);
      });
  }

  private searchAround(){
	this.disa = "none";
	this.disb = "block";
	let instance = AppGlobal.getInstance();
    //this.showAlert("search type: ",this.key);
	let response = this.functionInterface.SearchByType(instance.userid, instance.token, "116.408611,40.005033", this.key, "1000");
	response.toPromise()
	.then(responce => {
		this.around_result = JSON.parse(responce.text()).Merchants;
		this.result = null;
		this.resultnum = this.around_result.length;
		this.getphoto("1");
	}).catch(error => {
		this.showAlert("search error",error.statusText);
	});
	return response;
  }

  private divhid(type:number, a:number){
    if(type != a)
	  return "block";
	else
	  return "none";
  }

  private getphoto(flag:string){
	var poiids = new Array<string>();
	var photos = new Array<string>();
	if(flag == "0"){
		for(var i=0;i<this.result.length;i++){
			poiids.push((this.result)[i].MerchantBase.id);
			photos.push("assets/img/not found.jpg");
		}
	}else{
		for(var i=0;i<this.around_result.length;i++){
			poiids.push((this.around_result)[i].MerchantBase.id);
			photos.push("assets/img/not found.jpg");
		}
	}

	let map = new AMap.Map('tmp',{
	  resizeEnable: true,
      zoom: 18
    });

	AMap.service(["AMap.PlaceSearch"], function() {

		for(let j = 0;j < poiids.length; j++){
			let placeSearch = new AMap.PlaceSearch({
				pageSize: 10,
				pageIndex: 1,
				extension: 'all',
				map:map
			});
			placeSearch.getDetails(poiids[j], function(status, result) {
				if (status === 'complete' && result.info === 'OK') {
					if(result.poiList.pois.length > 0 && result.poiList.pois[0].photos.length>1){
						photos[j] = result.poiList.pois[0].photos[1].url;
					}
				}
			});
		}
	});
	this.photosrcs = photos;
  }

  private type_Format(type:string){
	let res = type.substr(0);
	let len = type.length;
	let a = type.indexOf(";");
	if(a != -1){
		let b = type.indexOf(";",a+1);
		if(b != -1){
			res = type.substr(b+1);
		}else{
			res = type.substr(a+1);
		}
	}
	return res;
  }

  private name_Format(name:string){
	let res = name.substr(0);
	let l = res.indexOf("(");
	let r = res.indexOf(")");
	if(l!=-1&&r!=-1){
		res = name.substr(0,l) + name.substr(r+1);
	}
	return res;
  }

  private showDetail(x){
	let privileges = new Array<Privilege>();
	let current_res;
	if (this.around_result) {
		current_res = this.around_result[x];
	}
	else{
		current_res = this.result[x];
	}
    let pris = current_res.Privilege;
	//console.log(this.around_result[x].Privilege);


	for(var i = 0;i<pris.length;i++){
		let  pri = new Privilege();
		pri.bank_id = pris[i].bankid.substr(0);
		pri.privilege_type = pris[i].privilegetype_o.substr(0);
		pri.amount_paid = "0";
		pri.detail1 = pris[i].detail1_o.toString();
		pri.detail2 = pris[i].detail2_o.toString();
		pri.detail3 = pris[i].detail3_o.toString();
		pri.bank_name = pris[i].bankname.substr(0);
		privileges.push(pri);
	}
	console.log("showdetail",privileges);
    this.navCtrl.push(MerchantDetailPage,{
		name : current_res.MerchantBase.name,
		address : current_res.MerchantBase.address,
		distance : current_res.MerchantBase.distance,
		tel : current_res.MerchantBase.tel,
		photo : this.photosrcs[x],
		privilege : privileges,
        location : current_res.MerchantBase.location
	});
  }

  ionViewDidLoad() {

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


