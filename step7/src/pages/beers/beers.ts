import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Data } from '../../providers/data';
import { BeerDetailPage } from '../beer-detail/beer-detail';

/*
  Generated class for the Beers page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-beers',
  templateUrl: 'beers.html'
})
export class BeersPage {
  searchTerm: string = '';
  beers: any;
  listSize: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.getData();
    this.setFilteredBeers();
  }

  getData() {
    this.dataService.getJsonData().subscribe(result => {
      this.beers = result;
      this.listSize = this.beers.length;
    });
  }

  setFilteredBeers() {
    this.beers = this.dataService.filterBeers(this.searchTerm);
  }

  presentModal(beerId) {
    let modal = this.modalCtrl.create(BeerDetailPage, {beerId});
    modal.present();
  }
}
