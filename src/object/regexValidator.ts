/**
 * Created by JesseYan on 2017/3/9.
 */
export class RegexValidator{

  private static usernameRegex = new RegExp("a");
  private static emailRegex = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/);

  public static isLegalUsername(content : string) : boolean{
    let result = RegexValidator.usernameRegex.test(content);
    console.log("Regex: " + result);
    return result;
  }

  public static isLegalEmail(content : string) : boolean{
    let result =  RegexValidator.emailRegex.test(content);
    console.log("Regex: " + result);
    return result;
  }
}
