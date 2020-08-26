import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import {UserService} from '../../core';


@Injectable()
export class AuthService {
  private user        : Observable<firebase.User>;
  private userDetail  : firebase.User = null;
  private userService : UserService;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe((user) => {
      if (user) {
        this.userDetail = user;
      } else {
        this.userDetail = null;
      }
    });
  }


  //signin with Google clinet id
  signinWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }


  //signin with Facebook app id and app sercret
  signinWithFacebook() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.FacebookAuthProvider()
    );
  }

  //sign out in firebase
  signOut() {
    this._firebaseAuth.auth.signOut();
    this.router.navigateByUrl('/');
    localStorage.clear();
  }

  // signin with anonymously in firebase.

  get isUserAnonymousLoggedIn(): boolean {
    return this.userDetail !== null ? true : false
  }

  get currentUserId(): any {
    return this.userDetail
  }

  signinWithAnonymously() {
    return this._firebaseAuth.auth.signInAnonymously()
    .then((user) => {
      // this.userDetail = user
      console.log("this._firebaseAuth.authState",this._firebaseAuth.authState)
    })
    .catch((err) => {
      console.log("error : ",err)
    })
  }
}
