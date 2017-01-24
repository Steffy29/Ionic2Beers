import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from '../../../../step7/src/providers/data';

/*
  Generated class for the BeerDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
  providers: [Data]
})
export class BeerDetailPage {

  beer = {};
  mainImg;
  errorMessage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public viewController: ViewController) {}

  getBeer(beerId: String) {
    this.dataService.getBeer(beerId)
      .then(
          beer => {
              this.beer = beer;
              //this.setImage(beer.img);
          },
          error => this.errorMessage = <any>error
      );
  }

  setImage(img: String) {
      this.mainImg = img;
  }

  dismiss() {
    this.viewController.dismiss();
  }
}
