import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
  }

  ionViewDidLoad() {
    this.setFilteredBeers();
    this.listSize = this.beers.length;
  }

  setFilteredBeers() {
    this.beers = this.dataService.filterBeers(this.searchTerm);
  }
}
