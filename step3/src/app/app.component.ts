import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { BeersPage } from '../pages/beers/beers';

import { TranslateService } from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'app.html'
})
export class Ionic2Beers {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(translate: TranslateService, public platform: Platform) {
    this.initializeApp();

    // set default language
    translate.setDefaultLang('en');
    translate.use('en');

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'home', component: HomePage },
      { title: 'beersList', component: BeersPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
