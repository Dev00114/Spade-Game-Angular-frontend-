import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HashURlService {
hash: string = Math.floor(Math.random() * 0xFFFFFF).toString(16);
constructor() { }
  urlHash(){
    if(!location.hash){
      location.hash = this.hash
    }
  }
}
