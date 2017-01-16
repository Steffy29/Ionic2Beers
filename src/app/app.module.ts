import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Ionic2Beers } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    Ionic2Beers,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(Ionic2Beers)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ionic2Beers,
    HomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
