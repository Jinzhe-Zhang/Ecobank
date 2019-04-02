/**
 * Created by JesseYan on 2017/1/18.
 */
import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {StorageService} from "./storageService";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpRequest{
  readonly HOSTURL : string = "https://api.us.apiconnect.ibmcloud.com/zzzzhen-prodecobankapp/sb/api";
  //readonly HOSTURL : string = "https://localhost:4002/api"
  
  static readonly contentType : string = "Content-Type";
  static readonly accept : string = "accept";
  static readonly application : string = "application/json";
  static readonly authLabel : string = "Authorization";
  static readonly x_ibm_client_id_label : string = "x-ibm-client-id";
  static readonly x_ibm_client_secret_label : string = "x-ibm-client-secret";
  
  static readonly x_ibm_client_id : string = "281f10da-f271-421d-991b-716196a75fee";
  static readonly x_ibm_client_secret : string = "B6fL3pO2uA8vY8hA7eT4eN5yO0iC8rN2rR5eJ5pU7wH4gO5jR1";
  //static readonly x_ibm_client_id : string = "default";
  //static readonly x_ibm_client_secret : string = "SECRET";

  static readonly access_control_label : string = "Access-Control-Allow-Origin";
  static readonly access_control : string = "*";

  constructor(
    private http : Http,
    private storageService : StorageService
  ){}

  /**
   *
   * @param auth
   * @param path
   * @param body
   */
  public httpPostRequest(path : string, body : string) {
    var header = new Headers();
    header.append(HttpRequest.contentType, HttpRequest.application);
    header.append(HttpRequest.accept, HttpRequest.application);
    header.append(HttpRequest.x_ibm_client_id_label, HttpRequest.x_ibm_client_id);
    header.append(HttpRequest.x_ibm_client_secret_label, HttpRequest.x_ibm_client_secret);

    let options = new RequestOptions( {headers : header} );
    return this.http.post(this.HOSTURL + path, body, options);
  }

  public httpPostRequestWithToken(path : string, body : string, token : string) {
    var header = new Headers();
    header.append(HttpRequest.contentType, HttpRequest.application);
    header.append(HttpRequest.accept, HttpRequest.application);
    header.append(HttpRequest.x_ibm_client_id_label, HttpRequest.x_ibm_client_id);
    header.append(HttpRequest.x_ibm_client_secret_label, HttpRequest.x_ibm_client_secret);
    header.append(HttpRequest.access_control_label, HttpRequest.access_control);

    let options = new RequestOptions( {headers : header} );
    return this.http.post(this.HOSTURL + path, body, options);
  }

  public httpGetRequest(token : string, path : string){
    var header = new Headers();
    header.append(HttpRequest.contentType, HttpRequest.application);
    header.append(HttpRequest.accept, HttpRequest.application);
    header.append(HttpRequest.x_ibm_client_id_label, HttpRequest.x_ibm_client_id);
    header.append(HttpRequest.x_ibm_client_secret_label, HttpRequest.x_ibm_client_secret);
    header.append(HttpRequest.access_control_label, HttpRequest.access_control);

    let options = new RequestOptions( {headers : header} );
    return this.http.get(this.HOSTURL + path, options);
  }

  public httpDeleteRequest(token : string, path : string){
    var header = new Headers();
    header.append(HttpRequest.accept, HttpRequest.application);
    header.append(HttpRequest.x_ibm_client_id_label, HttpRequest.x_ibm_client_id);
    header.append(HttpRequest.x_ibm_client_secret_label, HttpRequest.x_ibm_client_secret);
    header.append(HttpRequest.access_control_label, HttpRequest.access_control);

    let options = new RequestOptions( {headers : header} );
    return this.http.delete(this.HOSTURL + path, options);
  }

}
