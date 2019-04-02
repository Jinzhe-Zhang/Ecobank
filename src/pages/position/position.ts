import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, Platform} from 'ionic-angular';
import { FunctionInterface} from "../../object/functionInterface";
import { AppGlobal} from "../../app/app.global";
import { MapSearchResultPage } from "../mapsearchresult/mapsearchresult";
import { PaymentPage } from "../payment/payment";
import {yourx,youry} from "../recommend/recommend"
export var map;
@Component({
  selector: 'page-position',
  templateUrl: 'position.html'
})
export class PositionPage {
      private a : number =0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private functionInterface : FunctionInterface,
    private alertCtrl : AlertController
      , public toastCtrl : ToastController
  ) {
    this.ionViewDidLoad();
  }

  ionViewDidLoad() {
	this.loadMapA();
  }

  getmap(){
	//this.loadMapA();
	//this.loadMapB();
  }
  loadMapA() {
	 map = new AMap.Map("Amap", {
      resizeEnable: true,
      zoom: 18,
	  lang:'en',
      center: [yourx,youry]
    });
	

  }
  
  loadMapB() {
	var bmap = new BMap.Map("Bmap");          // 创建地图实例
	var point = new BMap.Point(116.414957,40.01129);  // 创建点坐标
	bmap.centerAndZoom(point, 19);                 // 初始化地图，设置中心点坐标和地图级别
	bmap.enableScrollWheelZoom(true);
	var myIcon = new BMap.Icon("../../assets/img/po.png", new BMap.Size(23, 25), {
      offset: new BMap.Size(10, 25)
	});
    var marker = new BMap.Marker(point, {icon: myIcon});
    bmap.addOverlay(marker);
  }

 //  private To_Rec(){
	// this.navCtrl.push(RecommendPage);
 //  }

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
      duration : 2000,
      showCloseButton : true,
      position : "bottom"});
    myToast.present();
  }
  private Btm1click(){
      var t = document.getElementById("btm");
      var tt = document.getElementById("Amap");
      var t2 = document.getElementById("btm2");
    if(this.a == 0)
    {
      t.style.top="50%";
      t.style.animation="up 0.7s";
      tt.style.animation="upp 0.7s";
      tt.style.marginTop="-25%";
      this.a=1;
      t2.style.animation="rot1 0.7s";
    t2.style.transform="rotate(180deg)";
    }
    else
    {
      t.style.top="95%";
      t.style.animation="down 0.7s";
      tt.style.animation="downn 0.7s";
      tt.style.marginTop="0";
      t2.style.animation="rot2 0.7s";
    t2.style.transform="rotate(0deg)";
      this.a=0;

    }
  }
}