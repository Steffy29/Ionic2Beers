import { NgModule, ErrorHandler } from '@angular/core';
import { Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { Ionic2Beers } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeersPage } from '../pages/beers/beers';

import { Data } from '../providers/data';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    Ionic2Beers,
    HomePage,
    BeersPage
  ],
  imports: [
    IonicModule.forRoot(Ionic2Beers),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Ionic2Beers,
    HomePage,
    BeersPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Data]
})
export class AppModule {}
