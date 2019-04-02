/**
 * Created by JesseYan on 2017/1/19.
 */

export class Product{
  constructor(
    public purchase_entry : string,
    public earning_rate : string,
    public risk_type : string,
    public product_id : string,
    public hold_time : string,
    public product_name : string
  ){}
}

export class OrderItem {
  constructor(
    public held_investment : number,
    public held_product_id : string
  ){}
}
