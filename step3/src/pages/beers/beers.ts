import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  beers: Array<{alcohol: number, name: string, description: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.beers = [
      {
        alcohol: 8.5,
        name: 'Affligem Tripel',
        description: 'The king of the abbey beers. It is amber-gold and pours with a deep head and original aroma, delivering a complex, full bodied flavour. Pure enjoyment! Secondary fermentation in the bottle.'
      },
      {
        alcohol: 9.2,
        name: 'Rochefort 8',
        description: 'A dry but rich flavoured beer with complex fruity and spicy flavours.'
      },
      {
        alcohol: 7,
        name: 'Chimay Rouge',
        description: 'This Trappist beer possesses a beautiful coppery colour that makes it particularly attractive. Topped with a creamy head, it gives off a slight fruity apricot smell from the fermentation. The aroma felt in the mouth is a balance confirming the fruit nuances revealed to the sense of smell. This traditional Belgian beer is best savoured at cellar temperature.'
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BeersPage');
  }

}
