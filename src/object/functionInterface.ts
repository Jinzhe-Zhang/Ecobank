/**
 * Created by JesseYan on 2017/1/18.
 */
import {Injectable} from "@angular/core";
import {HttpRequest} from "./httpRequest";
import {Base64} from "js-base64";
import {StorageService} from "./storageService";
import {Userinfo, User} from "./userinfo";
import {Order} from "./order";

/**
 *
 *
 * */
@Injectable()
export class FunctionInterface{
  private readonly SIGNUPPATH = "/EcoBankUsers";
  private readonly LOGINPATH = "/EcoBankUsers/login";
  private readonly CARDSPATH = "/cards";
  private readonly PRODUCTPATH = "/Products/all";
  private readonly BASICHEAD = "Basic ";

  private _authString : string = "";

  get authString(): string {
    return this._authString;
  }

  constructor(
    private httpRequest : HttpRequest,
    private storageServer : StorageService
  ){}

  /**
   * sign up
   * given username and password, encode authorization code by Base64
   * @param username Username of new user
   * @param password Password of new user
   * @constructor
   */
  public SignUp(postContent : string){
   // let auth = this.BuildAuth(username, password);
    console.log("SignUp message: " + postContent);
    return this.httpRequest.httpPostRequest(this.SIGNUPPATH, postContent);
  }

  public LogIn(postContent : string){
    console.log("log in  message: " + postContent);
    let response = this.httpRequest.httpPostRequest(this.LOGINPATH, postContent);
    return response;
  }

  public GetAllCards(id : string, token : string){
    let path = "/EcoBankUsers/" + id + "/cards";
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }

  public QueryProducts(token : string){
    let path = "/Products/all";
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }

  public AddCard(id : string, token : string, cardInfo : string){
    let path = "/EcoBankUsers/" + id + "/cards";
    let response = this.httpRequest.httpPostRequestWithToken(path, cardInfo, token);
    return response;
  }

  public DeleteCard(id : string, token : string, cardNum : string){
    let path = "/EcoBankUsers/deleteCard?id=" + id + "&fk=" + cardNum;
    let response = this.httpRequest.httpDeleteRequest(token ,path);
    return response;
  }

  public GetSingleBalance(id : string, token : string, cardNum : string){
    let queryPath = "/EcoBankUsers/cards/balance?id=" + id
      + "&fk=" + cardNum;
    let response = this.httpRequest.httpGetRequest(token, queryPath);
    return response;
  }

  public GetAllBalance(id : string, token : string){
    let queryPath = "/EcoBankUsers/balance?id=" + id;
    let response = this.httpRequest.httpGetRequest(token, queryPath);
    return response;
  }

  public orderProduct(id : string, token : string, orderInfo : string){
    let path = "/EcoBankUsers/" + id + "/orders";
    let response = this.httpRequest.httpPostRequestWithToken(path, orderInfo, token);
    return response;
  }
  
  public QueryOrder(id : string, token : string){
    let queryPath = "/EcoBankUsers/" + id + "/orders";
    let response = this.httpRequest.httpGetRequest(token, queryPath);
    return response;
  }

  public DeleteOrder(id : string, token : string, orderid : string){
    let path = "/EcoBankUsers/" + id + "/orders/" + orderid;
    let response = this.httpRequest.httpDeleteRequest(token ,path);
    return response;
  }

  public QuerySingleHistory(id: string, token : string, cardNum : string, start : string, end : string){
    let path = "/EcoBankUsers/cards/history?id=" +
        id + "&fk=" + cardNum + "&startdate=" + start +
        "&enddate=" + end;
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }

  public QueryAllHistory(id: string, token : string, start : string, end : string){
    let path = "/EcoBankUsers/history?id=" +
      id + "&startdate=" + start +
      "&enddate=" + end;
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }

  public QuerySingleStat(id: string, token : string, cardNum : string, start : string
    , end : string, bymonth : boolean){
    let path = "/EcoBankUsers/cards/statistics?id=" +
      id + "&fk=" + cardNum + "&bymonth=" + bymonth + "&startdate=" + start +
      "&enddate=" + end;
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }

  public QueryAllStat(id: string, token : string, start : string
    , end : string, bymonth : boolean){
    let path = "/EcoBankUsers/statistics?id=" +
      id + "&bymonth=" + bymonth + "&startdate=" + start +
      "&enddate=" + end;
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }

  public FindDisc(id: string, token : string, Mname : string, POIid : string, Money : string){
	let path = "/EcoBankUsers/payment?id=" + id + "&merchantid=" + POIid + "&merchantname=" + Mname + "&money=" + Money;
	let response = this.httpRequest.httpGetRequest(token, path);
	return response;
  }

  public Pay(id: string, token : string, fk : string, pwd : string, Mname : string, POIid : string, Money : string){
    let path = "/EcoBankUsers/pay?id=" + id + "&fk=" + fk + "&password=" + pwd + "&merchantname=" + Mname +"&buildingpoi=" + POIid + "&money=" + Money;
    let response = this.httpRequest.httpGetRequest(token, path);
    return response;
  }
  
  public SearchByKey(id: string, token : string, mylocation : string, keyword : string, radius : string){
	let path = "/EcoBankUsers/MerchantAroundByKeyword?location=" + mylocation + "&keywords=" + keyword + "&radius=" + radius;
	let response = this.httpRequest.httpGetRequest(token, path);
    return response;  
  }
  
  public SearchByType(id: string, token : string, mylocation : string, type : string, radius : string){
	let path = "/EcoBankUsers/MerchantAroundByType?location=" + mylocation + "&types=" + type + "&radius=" + radius;
	let response = this.httpRequest.httpGetRequest(token, path);
    return response;  
  }
  
  public CmpRecommend(id: string, token : string, rnum : string){
	let path = "/EcoBankUsers/recommandation?id=" + id + "&RN=" + rnum;
	let response = this.httpRequest.httpGetRequest(token, path);
	return response;
  }
  
  public aaaAAA(id: string, token : string){
    //let path = "/EcoBankUsers/payment?id=" + id + "&merchantname=" + Mname + "&money=" + Money;
	let path = "/EcoBankUsers/MerchantAroundByKeyword?location=116.518914,39.924162&keyword=Suxie&radius=1000";
	//let mylocation = "116.518914,39.924162";
	//let keyword = "Suxie";
	//let radius = "1000";
	
	//let path = "/EcoBankUsers/MerchantAroundByKeyword?location=" + mylocation + "&keyword=" + keyword + "&radius=" + radius;
	let response = this.httpRequest.httpGetRequest(token, path);
	//let response = this.SearchByKey(id,token,mylocation,keyword,radius);
	console.log("112233");
    return response;
  }
}
