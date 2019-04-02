/**
 * Created by JesseYan on 2017/1/16.
 */
export class BankCard{
  public card_num : string;
  public query_password : string;
  public bank : string;
}

export class BankCardBrief{
  public card_num : string;
  public bank : string;
}

export class BankCardList{
  public card_list : BankCard[];

  constructor(){
    this.card_list = new Array<BankCard>();
  }
}

export class Balance{
  public asset : number;
  public debt : number;
  public net : number;
  constructor(){}
}
