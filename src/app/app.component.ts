import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import {Router,NavigationStart} from '@angular/router';
import { UserService } from './core';
import { OpentokService } from "./opentok.service";
import * as OT from "@opentok/client";
import { HashURlService } from './core/services/hashURl.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;


  showHead: boolean = false;
  showFoot: boolean = false;
  constructor(
    private ref             : ChangeDetectorRef,
    private opentokService  : OpentokService,
    private userService     : UserService,
    private router          : Router,
    private hashUrl         : HashURlService
    ) {
    this.changeDetectorRef = ref;
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event["url"] == "/login") {
          this.showHead = false;
          this.showFoot = false;
        } else {
          this.showHead = true;
          this.showFoot = true;
        }
        if (event["url"] == "/editor#" + this.hashUrl.hash) {
          this.showHead = true;
          this.showFoot = false;
        } else {
          this.showHead = true;
          this.showFoot = true;
        }
      }
    });
  }

  ngOnInit() {
    this.opentokService
      .initSession()
      .then((session: OT.Session) => {
        this.session = session;
        this.session.on("streamCreated", (event) => {
          this.streams.push(event.stream);
          this.changeDetectorRef.detectChanges();
        });
        this.session.on("streamDestroyed", (event) => {
          const idx = this.streams.indexOf(event.stream);
          if (idx > -1) {
            this.streams.splice(idx, 1);
            this.changeDetectorRef.detectChanges();
          }
        });
      })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
      });
    this.userService.populate();
  }
}
