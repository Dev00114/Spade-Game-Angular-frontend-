import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-shareURl',
  templateUrl: './shareURl.component.html',
  styleUrls: ['./shareURl.component.scss']
})
export class ShareURlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const url = location.href;
    $('#p1').html(url);
  }

  copyToClipboard(element) {
    ($(element).text()).select();
    document.execCommand("copy");
  }

}
