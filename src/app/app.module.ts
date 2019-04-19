import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './core/app-routing.module';
import { AppComponent } from './root/app.component';

import { IonicStorageModule } from '@ionic/storage';
import { SellmodalPage } from './views/modals/sellmodal/sellmodal.page';
import { BuymodalPage } from './views/modals/buymodal/buymodal.page';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormationmodalPage } from './views/modals/formationdetail/formationmodal.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';

@NgModule({
	declarations: [AppComponent, SellmodalPage, BuymodalPage, FormationmodalPage],
	entryComponents: [SellmodalPage, BuymodalPage, FormationmodalPage],
	imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), HttpClientModule],
	providers: [
		StatusBar,
		SplashScreen,
		FileTransfer,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		ImagePicker,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptorService,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
