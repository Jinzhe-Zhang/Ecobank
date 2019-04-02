/**
 * Created by JesseYan on 2017/1/19.
 */

export class Privilege{
	public   bank_id : string;
	public   privilege_type : string;
	public   amount_paid : string;
	public   detail1: string;
	public   detail2: string;
	public   detail3: string;
	public   bank_name : string;
  constructor(){
  }
  
}

export class OrderPrivilege {
  constructor(
    public held_investment : number,
    public held_privilege_id : string
  ){}
}
