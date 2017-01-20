import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {
  beers: Array<{alcohol: number, description: string, id: string, img: string, name: string}>;

  constructor(public http: Http) {
    this.getJsonData().subscribe(data => {
      this.beers = data;
    });
  }

  getJsonData() {
    return this.http.get('../assets/beers/beers.json').map(res => res.json());
  }

  filterBeers(searchTerm) {
    return this.beers.filter((beer) => {
      return beer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}