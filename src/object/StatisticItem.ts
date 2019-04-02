/**
 * Created by yanzexin on 2017/2/16.
 */
export class StatisticItem{
  public catagory : string
  public item : number;
}

export class Statistic{
  public items : StatisticItem[];

  public addItem(item : StatisticItem){
    this.items.push(item);
  }

  public constructor(){
    this.items = new Array<StatisticItem>();
  }
}
