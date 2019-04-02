import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ActivityPage} from '../activity/activity'
var element1;
var element2;
/*
  Generated class for the PreferencePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html'
})

export class PreferencePage {
 public activities: any;
 private previousi: number = -1;
 private style: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activities=[{
        description : "A total of $199 per week. Can be awarded accordingly."
,        ID : "01234",
        Name:"Agricultural Bank weekly brush",
        Startingtime: new Date(),
        Stoppingtime: new Date(),
        imgurl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512307661480&di=4ecfd39440b532dba899b2400dcf724b&imgtype=0&src=http%3A%2F%2Fawb.img.xmtbang.com%2Fimg%2Fuploadnew%2F201611%2F03%2F669a90c658ba4c11b29a970c1011ee7d.jpg",
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
        },
        {description : "A total of $199 per week."
,            ID : "01234",
        Name:"Agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2078944334,735460089&fm=27&gp=0.jpg",
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
]},
        {description : "A total of $199 per week."
,            ID : "01234",
        Name:"So how is agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"https://static.rong360.com/pimg/bcom_logo_icon.gif",
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
]},
        {description : "A total of $199 per week. Can be awarded accordingly."
,            ID : "01234",
        Name:"Agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"https://static.rong360.com/pimg/citic_logo_icon.gif",
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
]},
        {description : "A total of $199 per week."
,            ID : "01234",
        Name:"Agricultural Bank weekly brush hahahaha",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"data:image/jpeg;base64,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",
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
]},{
        description : "A total of $199 per week. Can be awarded accordingly."
,        ID : "01234",
        Name:"How is Agricultural Bank weekly brush",
        Startingtime: new Date(),
        Stoppingtime: new Date(),
        imgurl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512307661480&di=4ecfd39440b532dba899b2400dcf724b&imgtype=0&src=http%3A%2F%2Fawb.img.xmtbang.com%2Fimg%2Fuploadnew%2F201611%2F03%2F669a90c658ba4c11b29a970c1011ee7d.jpg",
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
]},
        {description : "A total of $199 per week."
,            ID : "01234",
        Name:"Show Agricultural Bank weekly brush in Agricultural Bank weekly brush in Agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2078944334,735460089&fm=27&gp=0.jpg",
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
]},
        {description : "A total of $199 per week. Can be awarded accordingly."
,            ID : "01234",
        Name:"Agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
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
],
        imgurl:"https://static.rong360.com/pimg/bcom_logo_icon.gif"},
        {description : "A total of $199 per week."
,            ID : "01234",
        Name:"Agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"https://static.rong360.com/pimg/citic_logo_icon.gif",
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
]},
        {description : "A total of $199 per week."
,            ID : "01234",
        Name:"Agricultural Bank weekly brush",
        Startingtime:new Date(),
        Stoppingtime:new Date(),
        imgurl:"data:image/jpeg;base64,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",
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
]}];
    console.log(this.activities);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreferencePagePage');
  }
  getdate( time ){
    return time.toLocaleDateString();
  }
  To_ActivityPage(){
    this.navCtrl.push(ActivityPage,this.activities[this.previousi]);
  }
  showDetail(i){
  //  Document.getElementById()
  console.log(i);
  if(this.previousi!=i)
  {
  if (this.previousi>=0)
  {
element1=document.getElementsByClassName('pre')[this.previousi];
element1.setAttribute('class','pre fold');
element1.children[1].setAttribute('class','name foldname');
element1.children[2].setAttribute('style','display:inline;');
setTimeout(function(){
element1.setAttribute('style','height:17vw;');
}, 300);
  }
element2=  document.getElementsByClassName('pre')[i];
  element2.setAttribute('class','pre deploy');
element2.children[1].setAttribute('class','name deployname');
element2.children[2].setAttribute('style','display:none;');
var h=element2.children[3].clientHeight + element2.clientHeight + 30;/*
var tt=document.styleSheets[0];
tt.deleteRule(0);//清除之前写入的动画样式
tt.insertRule("@keyframes dploy{0%{height:"+hh+ "px;} 100%{height:"+h+ "px;}}",0);*/
element2.setAttribute('style','height:'+h+'px;');
console.log(document.styleSheets[0]);
  this.previousi=i;

setTimeout(function(){
element2.setAttribute('class','pre');
}, 300);
  }
  }
}
