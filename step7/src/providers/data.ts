import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Data {

  private beerUrl = '../assets/beers/';

  beers: Array<{alcohol: number, description: string, id: string, img: string, name: string}>;

  constructor(public http: Http) {
    this.getJsonData().subscribe(data => {
      this.beers = data;
    });
  }

  getJsonData() {
    return this.http.get(this.beerUrl + 'beers.json').map(res => res.json());
  }

  getJsonDataBeer(beerId) {
    return this.http.get(this.beerUrl + beerId + '.json').map(res => res.json());
  }

   getBeer(beerId: String): Promise<any[]> {
        return this.http.get(this.beerUrl + beerId + '.json')
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
    
    filterBeers(searchTerm) {
    return this.beers.filter((beer) => {
      return beer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

}