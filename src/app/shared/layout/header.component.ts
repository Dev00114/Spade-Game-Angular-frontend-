import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { User, UserService } from '../../core';
import { Observable, Subscription } from "rxjs";
import { Router, NavigationStart } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from '../../core/services/auth.service';
import { DocumentService } from '../../core/services/document.service';

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("currentuser") user: ElementRef;
  @ViewChild("currentuser") currentuser: ElementRef;
  documents: Observable<string[]>;
  currentDoc: string;


  private _docSub: Subscription;

  constructor(
    private userService: UserService,
    public authService: AuthService,
    private router: Router,
    private documentService: DocumentService
  ) {}

  currentUser: User;

  ngOnInit() {
    this.userService.currentUser.subscribe((userData) => {
      this.currentUser = userData;
    });
    this.documents = this.documentService.documents;
    this._docSub = this.documentService.currentDocument.subscribe(
      (doc) => (this.currentDoc = doc.id)
    );
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  loadDoc(id: string) {
    this.documentService.getDocument(id);
  }

  newDoc() {
    this.documentService.newDocument();
  }

  ngAfterViewInit(): void {
    if (localStorage.getItem("username")) {
      $("#currentuser").textContent = localStorage
        .getItem("username")
        .slice(0, 2);
    }
    if (this.authService.currentUserId) {
      $("#currentuser").textContent = this.authService.currentUserId.slice(
        0,
        2
      );
    }
  }
  signOut() {
    this.userService.purgeAuth();
    this.authService.signOut();
    localStorage.clear();
  }

  config_setting() {
    $("#configmodal").css("display", "block");
  }

  screen_landscape() {
    screen.orientation.unlock();
    alert(screen.orientation.unlock);
  }

  sideslide() {
    document.getElementById("Sidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("Sidenav").style.width = "0px";
  }

  modal_setting_close() {
    document.getElementById("Modal_setting").style.display = "none";
  }
}
