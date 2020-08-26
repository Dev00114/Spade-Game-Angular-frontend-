import { Injectable } from '@angular/core';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class TeamateService {

constructor() { }
  focus(){
    $(".focus").slideDown("slow");
  }

  focusout(){
    $(".focus").slideUp();
  }
}
