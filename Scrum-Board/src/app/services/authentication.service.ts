import { Injectable, NgZone } from '@angular/core';
import { User } from "../models/user";
import { auth } from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  userName: any;

  constructor(private _fireStore: AngularFirestore,
    private _auth: AngularFireAuth,
    private _router: Router,
    private _ngZone: NgZone) {

      this._auth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      });


    }

  // Reset Forgot password
  ForgotPassword(passwordResetEmail) {
    return this._auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        alert(error)
      })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this._fireStore.doc(`users/${user.uid}`);
    const userData: User = {
      id: user.uid,
      name: user.email.split("@")[0],
      email: user.email,
      emailVerified: user.emailVerified
    }
    return userRef.set(Object.assign({}, userData), {
      merge: true
    })
  }

  getUserID() {
    return this.userData.uid;
  }

 checkUserIdEquality(id:String){
   return this.userData.uid == id;
 }


  getUserName(){
    return this.userData.email.split("@")[0];
  }


  //Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this._auth.signInWithPopup(provider)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        console.log(error)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this._auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        alert(error.message)
      })
  }

  SignIn(email, password) {
    return this._auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this._ngZone.run(() => {
          this._router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        alert(error.message)
      })
  }

  SignOut() {
    return this._auth.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate(['sign-in']);
    })
  }
}
