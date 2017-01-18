import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Ionic2Beers } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeersPage } from '../pages/beers/beers';

@NgModule({
  declarations: [
    Ionic2Beers,
    HomePage,
    BeersPage
  ],
  imports: [
    IonicModule.forRoot(Ionic2Beers)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ionic2Beers,
    HomePage,
    BeersPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
