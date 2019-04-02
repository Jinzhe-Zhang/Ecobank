/**
 * Created by JesseYan on 2017/1/17.
 */
export interface User{}

export class Userinfo implements User{

  public username : string;
  public password : string;
  public email : string;

  constructor(name : string, psw : string, email : string){
    this.username = name.trim();
    this.password = psw;
    this.email = email.trim();
  }

}

export class NameAndPassword implements User{

  public username : string;
  public password : string;

  constructor(name : string, psw : string){
    this.username = name;
    this.password = psw;
  }

}

export class EmailAndPassword implements User{

  public email : string;
  public password : string;

  constructor(email : string, psw : string){
    this.email = email;
    this.password = psw;
  }

}
