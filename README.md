# Ionic 2 Beers

**Ionic Beers** is a tutorial of the [Beer Tutorials](http://www.beer-tutorials.org) series.
In this tutorial we will create a simple app that queries a beer catalog and displays a list of beers.

## Getting Started

Install [NodeJS](https://nodejs.org/) and then using the node package manager (npm), install ionic and cordova.

```
npm install -g ionic cordova
```

After installing ionic, create a new project called `ionic2-beers`.

```
ionic start ionic2-beers blank --v2
```

Navigate to the project directory and add the mobile development platform.

```
ionic platform add android
```

Run the application on the Android emulator.

```
ionic emulate android
```

Run the application on desktop browser
```
ionic serve --lab
```

> Note: To run the application in the Android emulator, you need to have the Android SDK
> installed and configured on your computer.
> The easiest way to do it is to install [Android Studio](http://developer.android.com/tools/studio/index.html)
> for your platform.
>
> If you have issues while initializing the app, read carefully [these instructions](http://ionicframework.com/docs/getting-help/)

## Project Structure

    .
    └── ionic2-beers
        ├── hooks
        │   ├── after_prepare
        │   │   └── ...
        │   └── README.md
        ├── node_modules
        │   ├── ...
        │   └── ...
        ├── platforms
        │   ├── android
        │   │   └── ...
        │   ├── ios
        │   │   └── ...
        │   └── platform.json
        ├── plugins
        │   ├── ...
        │   ├── fetch.json
        │   └── ios.json
        ├── resources
        │   ├── android
        │   │   └── ...
        │   ├── ios
        │   │   └── ...
        │   ├── icon.png
        │   └── splash.png
        ├── src
        │   ├── app
        │   |     ├── app.component.ts
        │   |     ├── app.html
        │   |     ├── app.module.ts
        │   |     ├── app.scss
        │   |     └── main.ts
        │   ├── assets
        │   |     └── icon
        │   |           └── favicon.ico
        │   ├── pages
        │   |     └── home
        │   |           ├── home.html
        │   |           ├── home.scss
        │   |           └── home.ts
        │   ├── theme
        │   |     └── variables.scss
        │   ├── declaration.d.ts
        │   ├── index.html
        │   ├── manifest.json
        │   └── service-worker.js
        ├── typings
        │   └── cordova-typings.d.ts
        ├── www
        │   ├── index.html
        |   ├── manifest.json
        |   └── service-worker.js
        ├── package.json
        ├── config.xml
        ├── ionic.config.json
        ├── tsconfig.json
        └── tslint.json


Inside  the project folder there are 8 sub-folders: `hooks`, `node_modules`, `platforms`, `plugins`, `resources`, `src`, `typings` and `www`. The application source code resides in the `app` folder. Application code is written using Angular2 and Typescript.

Inside the `src` folder is a file called `index.html` which has the default application code. Finally `app/main.ts` contains the code to start the application with the defined modules.

## Designing the app

### Beers list

We need to create a new page to list the beers in the application. For that, we're going to use Ionic CLI to generate pages with command

```
ionic generate page beers
```

Open `pages/beers/beers.html` and add the code which define the beers list to display.

```
<ion-content padding>
    <ul>
        <li>
            <span>Affligem Blond</span>
            <p>
                Affligem Blonde, the classic clear blonde abbey ale, 
                with a gentle roundness and 6.8% alcohol. Low on bitterness, 
                it is eminently drinkable.
            </p>
        </li>
        <li>
            <span>Affligem Tripel</span>
            <p>
                The king of the abbey beers. It is amber-gold and pours with a 
                deep head and original aroma, 
                delivering a complex, full bodied flavour. Pure enjoyment! Secondary 
                fermentation in the bottle.
            </p>
        </li>
    </ul>

    <p>Total number of beers: 2</p>
</ion-content>
```

Now, we need to add this new page to the application. Open `app/app.component.ts` and add after the import of the HomePage

```
import { BeersPage } from '../pages/beers/beers';
```

Open `app/app.module.ts` and add after the import of the HomePage

```
import { BeersPage } from '../pages/beers/beers';
```

Add the BeersPage in `declarations` and `entryComponents`

Save changes.

### Menu

First, we're going to add the menu to the app. For that, open `app/app.html` and replace code with this code

```
<ion-menu [content]="content">
    <ion-header>
        <ion-toolbar>
            <ion-title>Menu</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content>
        <ion-list>
            <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
        </ion-list>
    </ion-content>

</ion-menu>

<!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
```

Now, we need to add the reference to the menu in the application pages. Open `pages/beers/beers.html` and add this code at the beginning of the page

```
<ion-header>
    <ion-navbar>
        <button ion-button menuToggle>
      <ion-icon name="menu"></ion-icon>
    </button>
        <ion-title>Ionic 2 Beers Gallery</ion-title>
    </ion-navbar>
</ion-header>
```

Do the same for `pages/home/home.html`.

Open `app/app.component.ts` and add in the `@angular/core` import

```
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
```

and add this code before the constructor

```
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
```

and add this code in the constructor 

```
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Beers list', component: BeersPage }
    ];
```

And add 
```
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
```
Save changes and run the app. It should look this way.

![Get beers list](../img/2017-01-21-getBeersList.png)

## Fetching data from Beer catalog

In the first step, we load beers catalog in a static page. Now, we load this catalog from the controller.
First, open `pages/beers/beers.ts` and add the code in the constructor

```
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
```

Then open `pages/beers/beers.html` and modify the display list construction like this

```
<ul>
    <li *ngFor="let beer of beers">
        <span>{{beer.name}}</span>
        <p>
            {{beer.description}}
        </p>
    </li>
</ul>

<p>Total number of beers: {{beers.length}}</p>
```

## Translate labels

Now the application needs to be translated for users all around the world. For this, add `ng2-translate` library with this command and update bower configuration

```
npm install ng2-translate --save
```

Open `app/app.component.ts` file  and add

```
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
```

and add parameter to the constructor

```
constructor(translate: TranslateService, public platform: Platform) {
```

and set default language in the constructor

```
// set default language
translate.setDefaultLang('en');
translate.use(translate.getBrowserLang());
```

Create new files that contain translated labels in a new directory `i18n` in `assets` directory, for example `en.json`

```
{
	"menu" : "Menu",
	"home" : "Home",
	"beersList" : "List of beers",
	"beerGallery" : "Ionic Beer Gallery",
	"beersNumbers" : "Total number of beers",
	"content" : "Welcome!",
	"ionicBeers" : "Ionic Beers"
}
```

Update `pages/home/home.html` file to translate labels

```
{{'content' | translate}}
```

Change all labels in `*.html` files to translate labels


## Search in list

Sometimes we need to search in list. Angular do this with easy providers (or services).

We need to create a new provider with Ionic CLI

```
ionic g provider Data
```

Open `app/app.module.ts` and add

```
import { Data } from '../providers/data';
```

In `@NgModule` add the definition of the provider

```
providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Data]
```

Open `providers/data.ts` file and add in the Data class

```
  beers: Array<{alcohol: number, name: string, description: string}>;

  constructor(public http: Http) {
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

  filterBeers(searchTerm) {
    return this.beers.filter((beer) => {
      return beer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
```

In `beers/beers.ts` file import the provider Data

```
import { Data } from '../../providers/data';
```

and replace the beers definition

```
  searchTerm: string = '';
  beers: any;
  listSize: number;
```

Remove the initialization of the beers list in the constructor and define the filtered function

```
  setFilteredBeers() {
    this.beers = this.dataService.filterBeers(this.searchTerm);
  }
```

Open `beers/beers.html` and add lines to filter beers

```
<div>
    <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="setFilteredBeers()"></ion-searchbar>
</div>
```

Replace the code for the list size

```
<p>{{'beersNumbers' | translate}} : {{listSize}}</p>
```

## Loading beers from JSON files

Open `providers/data.ts` and replace the code in the constructor

```
    this.getJsonData().subscribe(data => {
      this.beers = data;
    });
```

and create a new function

```
  getJsonData() {
    return this.http.get('../assets/beers/beers.json').map(res => res.json());
  }
```

Open `pages/beers/beers.ts` and create a new function

```
  getData() {
    this.dataService.getJsonData().subscribe(result => {
      this.beers = result;
      this.listSize = this.beers.length;
    });
  }
```

and add the call of the function in `ionViewDidLoad` function.

## Getting the beers pics

We can also extract the image URL from the received JSON and then we add the image to the `pages/beers/beers.html`:

```
<a href="#/assets/beers/{{beer.id}}">
    <ion-img src="{{beer.img}}" class="thumb-img"></ion-img>
</a>
<div class="thumb">
    <a href="#/beers/{{beer.id}}">{{beer.name}}</a>
    <p>{{beer.description}}</p>
</div>
```

![After adding pics](../img/2017-01-21-beers-pics.png)