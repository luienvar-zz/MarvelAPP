import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MarvelService } from '../../providers/marvel-service/marvel-service';

@Component({
  selector: 'page-comicView',
  templateUrl: 'comicView.html'
})
export class ComicViewPage {
    
  params: any;
  comic: any;
  image: any;
  title: any;
  description: any;

  constructor(public navCtrl: NavController, params: NavParams, public marvelService: MarvelService) {
    this.params = params.data;
    console.log(this.params);
    this.getDetails(this.params)
  }
  getDetails(id) {
      this.marvelService.getDetails(id).then(
          res => {
              this.comic = res.data.results;
              console.log(this.comic)
      });
  }


}