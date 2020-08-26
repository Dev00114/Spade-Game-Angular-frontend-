import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from '../core/services/auth.service'
import {UserService} from '../core'
import { AngularFireAuth } from 'angularfire2/auth'
import { getLocaleMonthNames } from '@angular/common';

@Component({
  selector   : "app-auth-page",
  templateUrl: "./auth.component.html",
  styleUrls  : ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  @ViewChild('username') username : ElementRef;

  constructor(
    private router      : Router,
    private authservice : AuthService,
    private userService : UserService,
    private _fireauth   : AngularFireAuth
  ){}

  ngOnInit() {}


  signinWithGoogle(){
    this.authservice.signinWithGoogle()
    .then((res) => {
      localStorage.setItem("username",this._fireauth.auth.currentUser.displayName);
      console.log(this._fireauth.auth.currentUser,"this._fireauth.auth.currentUser");
      this.signinwithcunnitAPi()
    })
    .catch((err) => {
      console.log("error : ",err)
    })
  }


  signWithFacebook(){
    this.authservice.signinWithFacebook()
    .then((res) => {
      this.signinwithcunnitAPi()
    })
    .catch((err) => {
      console.log("error : ",err)
    })
  }

  signinWithAnonymously(){
    const username = this.username.nativeElement.value
    if (username == '') return
    localStorage.setItem("username", username)
    this.authservice.signinWithAnonymously()
    .then(() => {
      this.signinwithcunnitAPi()
    })
  }

  signinwithcunnitAPi(){
    const credentials = {email : "evelyncunni56@gmail.com",password : "psj00114"}
    this.userService
      .attemptAuth('login',credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          console.log(err)
        }
      )
  }
}
