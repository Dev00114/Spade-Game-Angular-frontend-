import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Input,
} from "@angular/core";
import { OpentokService } from "../opentok.service";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { Article, ArticlesService } from '../core';
import { ViewEncapsulation } from "@angular/core";
import { HashURlService } from '../core/services/hashURl.service';

@Component({
  selector: "app-editor-page",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements AfterViewInit {
  @ViewChild("publisherselfDiv") publisherselfDiv: ElementRef;
  @ViewChild("publisherDiv") publisherDiv: ElementRef;
  @Input() session: OT.Session;
  publisher: OT.Publisher;
  publishing: Boolean;

  constructor(
    private opentokService : OpentokService,
    private hashurl        : HashURlService
  ) {}

  ngAfterViewInit() {
    const OT = this.opentokService.getOT();
    this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
      insertMode: "append",
      width     : "150px",
      height    : "100px"
    });
    if (this.session) {
      if (this.session["isConnected"]()) {
        this.publish();
      }
      this.session.on("sessionConnected", () => this.publish());
    }
  }

  ngOnInit() {
    this.firstmodal();
    this.hashurl.urlHash();
  }

  publish() {
    this.session.publish(this.publisher, (err) => {
      if (err) {
        alert(err.message);
      } else {
        this.publishing = true;
      }
    });
  }

  firstmodal() {
    setTimeout(() => {
      $(".modal").css("display", "none");
      this.secondmodal();
    }, 2000);
  }

  secondmodal() {
    $('#waiting').css('display', 'block');
    // this.thirdmodal();
  }

  thirdmodal(){
    navigator.mediaDevices.enumerateDevices().then(this.gotDevices).catch();
    $("#configmodal").css("display", "block");
  }

  gotDevices(deviceInfos) {
    console.log("deviceInfos", deviceInfos);
    if (deviceInfos.length == "null") {
    } else {
      for (let i = 0; i < deviceInfos.length; i++) {
        if (deviceInfos[i].kind == "audioinput") {
          console.log(deviceInfos[i].kind == "audioinput");
          $("#audioinput").append(
            "<option>" + deviceInfos[i].label + "</option>"
          );
        }
        if (deviceInfos[i].kind == "audiooutput") {
          $("#audiooutput").append(
            "<option>" + deviceInfos[i].label + "</option>"
          );
        }
        if (deviceInfos[i].kind == "videoinput") {
          $("#videoinput").append(
            "<option>" + deviceInfos[i].label + "</option>"
          );
        }
      }
    }
  }

  Done_configmoal() {
    $("#configmodal").css("display", "none");
    $(".timer").css("display", "block");
  }
}

