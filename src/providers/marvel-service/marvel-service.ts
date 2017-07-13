import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

//import Sha from 'sha.js'
//import Md5 from 'ts-md5/dist/md5'

import CryptoJS from 'crypto-js'
/*
  Generated class for the MarvelServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MarvelService {

  url = 'https://gateway.marvel.com/v1/public/comics';
  publicKey = 'edea908b67dcc49867c72e11b55c21b1';
  privateKey = 'fe6d5e2f967dc15dd14bf82723518c913bbbc6b5';
  timestamp = Date.now();
  data: any;
  details: any;
  hash = CryptoJS.MD5(this.timestamp+this.privateKey+this.publicKey).toString();
  baseURL = this.url+'?apikey='+this.publicKey+'&ts='+this.timestamp+'&hash='+this.hash;
  finalUrl = '';

  constructor(public http: Http) {
    console.log('Hello MarvelServiceProvider Provider');
  }

  getComics(offset ?: number) {
    if(offset != undefined){
            this.finalUrl = this.baseURL+'&offset='+offset;
            console.log(offset);
        }else{
            this.finalUrl = this.baseURL
        }
    return this.http.get(this.finalUrl).toPromise().then(res => res.json())
  }

  getDetails(id) {
    return this.http.get(this.url+'/'+id, {
        params: {
          ts: this.timestamp,
          apikey: this.publicKey,
          hash: this.hash
        }}).toPromise().then(res => res.json())
  }

  searchComicsByName(word: string, offset ? : number, limit?:boolean){
        if(offset != undefined){
            this.finalUrl = this.baseURL+'&titleStartsWith='+word+'&offset='+offset;
        }else if(limit){
            this.finalUrl = this.baseURL+'&titleStartsWith='+word+'&limit=5';
        }else{
            this.finalUrl = this.baseURL+'&titleStartsWith='+word;
        }
        return this.http.get(this.finalUrl).toPromise().then(res => res.json())
  }

  searchComicsByYear(year: number, offset ? : number, limit?:boolean){
        if(offset != undefined){
            this.finalUrl = this.baseURL+'&startYear='+year+'&offset='+offset;
        }else if(limit){
            this.finalUrl = this.baseURL+'&startYear='+year+'&limit=5';
        }else{
            this.finalUrl = this.baseURL+'&startYear='+year;
        }
        return this.http.get(this.finalUrl).toPromise().then(res => res.json())
  }
}
