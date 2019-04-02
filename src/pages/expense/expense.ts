import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, AlertController, LoadingController} from 'ionic-angular';
import  ECharts  from 'echarts'
import {BankCardBrief} from "../../object/bankCard";
import {AppGlobal} from "../../app/app.global";
import {Statistic, StatisticItem} from "../../object/StatisticItem";
import {FunctionInterface} from "../../object/functionInterface";
import {TransPage} from "../trans/trans";

@Component({
  selector: 'page-expense',
  templateUrl: 'expense.html'
})
export class ExpensePage {

  private cards : BankCardBrief[];

  private startdate : string = "";
  private enddate : string = "";
  private card : string = "all";
  private type : string = "month";
  private isQuery : number = 0;
  private chart;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl : ToastController,
    private functionInterface : FunctionInterface,
    private alertCtrl : AlertController,
    private loadingControl : LoadingController
  ) {
    this.dataInit();
  }

  private dataInit(){
    this.cards = AppGlobal.getInstance().bankCards;
  }
  private To_Trans(){
    this.navCtrl.push(TransPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExpendPage');
    var myChart = ECharts.init(document.getElementById('chart') as HTMLDivElement);
    var xdata=["一月","二月","三月","四月","五月","六月"];
    var ydata=[5, 20, 36, 10, 10, 20];
    var option = {
      title: {
        text: '月消费'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xdata
      },
      yAxis: {
        //<!--不显示y轴-->
        show: false
      },
       dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [{
        name: '销量',
        type: 'line',
        data: ydata,
        //<!--显示各点Y轴数值-->
        itemStyle : {
          normal: {
            label : {
              show: true
            }
          }
        },
        //<!--两点之间的连线-->
        markLine: {
          data: [[
            {name: '限额', coord: [0,40]},
            {coord:[5,40]}
          ]]
        }
      }]
    };
    myChart.setOption(option);
    var myChart1 = ECharts.init(document.getElementById('chart1') as HTMLDivElement);
    var coption = {
      series : [{
        name: '消费占比',
        type: 'pie',
        radius: ['30%','60%'],
        tooltip:{
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // <!--将标签显示在饼图内部-->
        label: {
          normal: {
          }
        },
        // <!--显示各点Y轴数值-->

        data:[
          {value:235, name:'食物'},
          {value:274, name:'购物'},
          {value:310, name:'贷款'},
          {value:335, name:'住宿'},
          {value:400, name:'电子'}
        ]
      }]
    }
    myChart1.setOption(coption);
    this.chart = myChart;
  }


  private query(){
    let instance = AppGlobal.getInstance();

    if(this.startdate == "" || this.enddate == ""){
      this.popToast("Please select date range.");
    }
    else{
      let queryLoader = this.loadingControl.create({
        content : "Processing...",
        duration : 10000,
        dismissOnPageChange : true
      });      queryLoader.present();
      let isQuerying = true;
      let queryOkay = false;

      let start = this.dateFormate(this.startdate);
      let end = this.dateFormate(this.enddate);

      let response;
      if(this.card == "all"){
        response = this.functionInterface.QueryAllStat(instance.userid, instance.token
          , start, end, this.type == "month");
      }else{
        response = this.functionInterface.QuerySingleStat(instance.userid, instance.token
          , this.card, start, end, this.type == "month");
      }

      response.toPromise()
        .then(responce => {
          this.parseStat(responce.text());
          queryOkay = true;
          isQuerying = false;
          queryLoader.dismiss();
		  this.isQuery = 1;
        }).catch(error => {
        this.showAlert("Error",error.statusText);
          queryOkay = false;
          isQuerying = false;
          queryLoader.dismiss();
      });
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

  xFormat(x:string){
	if(x.length>4){
	  return x.substring(0,4) + "-" +　x.substr(4);
	}
	return x;
  }

  private parseStat(data : string){
    let dataArray = JSON.parse(data).data;

    let xData = [];
    let yData = [];

    for(var i = 0; i < dataArray.length; i ++){
      xData.push(this.xFormat(dataArray[i].xAxis));
      yData.push(dataArray[i].yAxis.toFixed(2));
    }
    // var xData=["一月","二月","三月","四月","五月","六月"];
    // var yData=[5, 20, 36, 10, 10, 20];
    var option = {
      tooltip: {},
      legend: {
        data:['Expand']
      },
      xAxis: {
        data: xData
      },
      yAxis: {
        show: false
      },
      series: [{
        //name: 'Type',
        type: 'line',
        data: yData
      }]
    };

    this.chart.setOption(option);
  }

  private dateFormate(date : string) : string{
    return date.replace('-', '').replace('-', '');
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
