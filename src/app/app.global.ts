import {BankCardBrief} from "../object/bankCard";
import {BalanceModel} from "../object/balanceModel";
/**
 * Created by JesseYan on 2017/2/9.
 */
export class AppGlobal{
  //singlation pattern
  private static globalInstance : AppGlobal = new AppGlobal();

  public token : string = "";
  public userid : string = "";

  private _cacheProducts : string = "{\"product_list\":[{\"purchase_entry\":\"10,000.00\",\"earning_rate\":\"1.50%\",\"risk_type\":\"RISK-PR1\",\"product_id\":\"BLC001\",\"hold_time\":\"N/A\",\"product_name\":\"RIRIYING\"},{\"purchase_entry\":\"100,000.00\",\"earning_rate\":\"2.03%\",\"risk_type\":\"RISK-PR2\",\"product_id\":\"BLC002\",\"hold_time\":\"180\",\"product_name\":\"WENJIANLICAI\"},{\"purchase_entry\":\"500,000.00\",\"earning_rate\":\"5.60%\",\"risk_type\":\"RISK-PR3\",\"product_id\":\"BLC003\",\"hold_time\":\"360\",\"product_name\":\"ANXINZHAIQUAN\"},{\"purchase_entry\":\"1,000,000.00\",\"earning_rate\":\"6.10%\",\"risk_type\":\"RISK-PR4\",\"product_id\":\"BLC004\",\"hold_time\":\"720\",\"product_name\":\"CHENGZHANGXINTUO\"},{\"purchase_entry\":\"1,000,000.00\",\"earning_rate\":\"7.40%\",\"risk_type\":\"RISK-PR5\",\"product_id\":\"BLC005\",\"hold_time\":\"90\",\"product_name\":\"JINQUJIJIN\"}]}";
  private _cachePrivilege : string = 
  "{\"privilege_list\":[{\"privilege_id\":\"1\",\"bank_id\":\"1\",\"bank_name\":\"Coconut\",\"merchant_type\":\"1\",\"start_time\":\"N/A\",\"end_time\":\"N/A\",\"privilege_type\":\"1\",\"privilege_detail\":\"000000000010000000000000000000750000000000001000000\"},{\"privilege_id\":\"2\",\"bank_id\":\"1\",\"bank_name\":\"Orange\",\"merchant_type\":\"2\",\"start_time\":\"N/A\",\"end_time\":\"N/A\",\"privilege_type\":\"111\",\"privilege_detail\":\"000000000010000000000000000000750000000000001000000\"}]}";
  private _bankCards : Array<BankCardBrief>;

  private _myProducts : Array<any> = new Array<any>();

  public deleteCard(cardNum : string){
    let pos = 0;

    for(let i = 0; i < this._bankCards.length; i ++){
      if(this._bankCards[i].card_num == cardNum){
        pos = i;
        break;
      }
    }

    this._bankCards.splice(pos, 1);
  }

  public deleteOrder(id : string){
    let pos = 0;

    for(let i = 0; i < this._myProducts.length; i ++){
      if(this._myProducts[i].id == id){
        pos = i;
        break;
      }
    }

    this._myProducts.splice(pos, 1);
  }

  get myProducts(): Array<Object> {
    return this._myProducts;
  }

  set myProducts(value: Array<Object>) {
    this._myProducts = value;
  }

  get bankCards(): Array<BankCardBrief> {
    return this._bankCards;
  }

  set bankCards(value: Array<BankCardBrief>) {
    this._bankCards = value;
  }

  get cacheProducts(): string {
    return this._cacheProducts;
  }

  set cacheProducts(value: string) {
    this._cacheProducts = value;
  }

  get cachePrivilege() : string {
    return this._cachePrivilege;
  }

  set cachePrivilege(value : string)  {
    this._cachePrivilege = value;
  }

  private constructor(){
    this._bankCards = new Array<BankCardBrief>();
  }

  public static getInstance() : AppGlobal{
    return this.globalInstance;
  }
}
