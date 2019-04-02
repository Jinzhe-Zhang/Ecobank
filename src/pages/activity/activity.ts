import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ActivityPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {

  private ID : string;
  private Name : string;
  private Startingtime : any;
  private Stoppingtime : any;
  private Unit : string;
  private description : String;
  private Award : any;
  /*
  private Bcount : number;
  private Scount : number;
  private costTransaction : number;
  private Money : number;
  private isContinuity : boolean;
  private Description : String;*/

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.Name = navParams.get("Name");/*
  this.Bcount = navParams.get("Bcount");
  this.Scount = navParams.get("Scount");
  this.costTransaction = navParams.get("costTransaction");
  this.Money = navParams.get("Money");
  this.isContinuity = navParams.get("isContinuity");
  this.Description = navParams.get("Description");*/
  this.ID = navParams.get("ID");
  this.Startingtime = navParams.get("Startingtime");
  this.Stoppingtime = navParams.get("Stoppingtime");
  this.Unit = navParams.get("Unit");
  this.Award = navParams.get("Award");
  this.description = navParams.get("description");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }
  gettime( time ){
    return time.toLocaleDateString();
  }
  ctn( continu : boolean){
    return ( continu ? "yes" : "no" );
  }
  plural( bc : number , u : string )
  {
    return ( bc==1 ? u : u+"s");
  }
  money( m )
  {
    return ( m == -1 ? "-" : m );
  }
}
