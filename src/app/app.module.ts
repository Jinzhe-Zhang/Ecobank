import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { MePage} from "../pages/me/me";
import { BalancePage} from "../pages/balance/balance";
import { TransPage} from "../pages/trans/trans";
import { ExpensePage} from "../pages/expense/expense";
import { SignedPage} from "../pages/signed/signed";
import { CardsPage} from "../pages/cards/cards";
import { PaymentPage} from "../pages/payment/payment";
import { MainTabPage} from "../pages/main-tab/main-tab";
import { ManagePage} from "../pages/manage/manage";
import { HttpRequest} from "../object/httpRequest";
import { FunctionInterface} from "../object/functionInterface";
import { StorageService} from "../object/storageService";
import { NewcardPage} from "../pages/newcard/newcard";
import { OrderProductPage} from "../pages/order-product/order-product";
import { OrderPrivilegePage} from "../pages/order-privilege/order-privilege";
import { PositionPage} from "../pages/position/position";
import { PreferencePage} from "../pages/preference/preference";
import { ChooseCardPage} from "../pages/choosecard/choosecard";
import { MerchantDetailPage} from "../pages/merchantdetail/merchantdetail";
import { RecommendPage } from "../pages/recommend/recommend";
import { ActivityPage } from "../pages/activity/activity";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    MePage,
    BalancePage,
    TransPage,
    ExpensePage,
    SignedPage,
    CardsPage,
    PaymentPage,
    MainTabPage,
    ManagePage,
    NewcardPage,
    OrderProductPage,
    OrderPrivilegePage,
	PositionPage,
	ChooseCardPage,
	MerchantDetailPage,
	RecommendPage,
    PreferencePage,
    ActivityPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    MePage,
    BalancePage,
    TransPage,
    ExpensePage,
    SignedPage,
    CardsPage,
    PaymentPage,
    MainTabPage,
    ManagePage,
    NewcardPage,
    OrderProductPage,
    OrderPrivilegePage,
	PositionPage,
	ChooseCardPage,
	MerchantDetailPage,
	RecommendPage,
    PreferencePage,
    ActivityPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpRequest, FunctionInterface, StorageService]
})
export class AppModule {}
