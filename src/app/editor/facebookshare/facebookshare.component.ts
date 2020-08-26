import { Component, ElementRef, AfterViewInit, Input } from "@angular/core";

@Component({
  selector      : "app-facebookshare",
  templateUrl   : "./facebookshare.component.html",
  styleUrls     : ["./facebookshare.component.scss"],
})
export class FacebookshareComponent implements AfterViewInit {

  constructor() {

  }

  ngAfterViewInit(): void {}

  fb(e){
      window.open(
      "https://www.facebook.com/sharer/sharer.php?u=",
      "facebook-popup",
      "height=600,width=900"
    );
  }

  Google(){
    window.open(

    )
  }
}
