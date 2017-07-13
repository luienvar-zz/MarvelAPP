import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MarvelService } from '../../providers/marvel-service/marvel-service';

import { ComicViewPage } from '../comicView/comicView';

import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-comics',
  templateUrl: 'comics.html'
})
export class ComicsPage {
    searchComic: string = '';
    searchByYear: number = 0;
    params: Object;
    pushPage: any;
    comics: any;
    offset: number;
    countComic: number;
    masComics: any;
    hide:boolean = true;
    tipo:string = 'Año'

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public marvelService: MarvelService) {
        this.pushPage = ComicViewPage;
        this.params = {}
        this.getComics();
    }

    ngIfCtrl(){
        this.hide = !this.hide;
        if (this.hide == true) {this.tipo = 'Año'; this.searchComic='' }
        else {this.tipo = 'Nombre'; this.searchByYear=0; }
        this.comics=[];
        this.getComics();

    }

    getComics() {
        console.log("Cargando comics iniciales....")
        this.marvelService.getComics().then(
            res => {
                this.comics = res.data.results;
                this.countComic = res.data.count;
                this.offset = res.data.offset;
                this.searchByYear = 0;
                this.searchComic = '';

        });
    }

    doInfinite(infiniteScroll) {

        if (this.searchComic.length > 0 && this.hide == true)
            {
                console.log("Buscando mas comics por nombre...."+this.searchComic);
                this.offset += this.countComic
                this.marvelService.searchComicsByName(this.searchComic,this.offset).then(res =>{
                    this.countComic = res.data.count;
                    this.masComics = res.data.results;
                    console.log(res.data.results);
                    for(let nuevos of this.masComics){
                    this.comics.push(nuevos)
                    }
                    infiniteScroll.complete();
                }) 
            }
        if (this.searchByYear.toString().length == 4 && this.hide == false)
            {
                console.log("Buscando mas comics por año...."+this.searchByYear);
                this.offset += this.countComic
                this.marvelService.searchComicsByYear(this.searchByYear,this.offset).then(res =>{
                    this.countComic = res.data.count;
                    this.masComics = res.data.results;
                    console.log(res.data.results);
                    for(let nuevos of this.masComics){
                    this.comics.push(nuevos)
                    }
                    infiniteScroll.complete();
                }) 
            }
        if ( this.searchByYear < 4 && this.searchComic.length == 0 ) {
            console.log("Buscando mas comics....");
            this.offset += this.countComic
            this.marvelService.getComics(this.offset).then(res =>{
                this.countComic = res.data.count;
                this.masComics = res.data.results;
                console.log(res.data.results);
                for(let nuevos of this.masComics){
                    this.comics.push(nuevos)
                }
                infiniteScroll.complete();
            })
        }
    }

    getSearchedComics(ev: any) {
        let texto = ev.target.value;
        this.searchComic = texto;
        if(texto.length > 0){
            console.log('buscando por nombre....'+texto);
            this.marvelService.searchComicsByName(texto,undefined,false).then(
                res => {
                    this.comics = res.data.results;
                    this.countComic = res.data.count;
                    this.offset = res.data.offset;
                    console.log(res.data);
                    console.log(this.countComic);
            });
        }
        if(texto == ''){
          this.getComics();
        }
    }

    presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Año Invalido',
        subTitle: 'Debe ingresar año en formato de 4 digitos, eg: 2000',
        buttons: ['Cerrar']
      });
      alert.present();
    }

    getSearchedComicsbyYear(ev: any) {
        let year = ev.target.value;
        this.searchByYear = year;
        if(year.toString().length == 4){
            console.log('buscando por año....'+year.toString());
            this.marvelService.searchComicsByYear(year,undefined,false).then(
                res => {
                    this.comics = res.data.results;
                    this.countComic = res.data.count;
                    this.offset = res.data.offset;
                    console.log(res.data);
                    console.log(this.countComic);
            });
        }
        if(year.toString().length < 4){
          this.getComics();
        }
        if(year.toString().length > 4){
            this.presentAlert();
            console.log("Resultados improbables debe ser numero de 4 digitos")
        }

    }




}