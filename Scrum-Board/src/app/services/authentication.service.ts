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

  constructor(private _fireStore: AngularFirestore,
    private _auth: AngularFireAuth,
    private _router: Router,
    private _ngZone: NgZone) { }





  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return (await this._auth.currentUser).sendEmailVerification()
      .then(() => {
        this._router.navigate(['verify-email']);
      })
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
    const userRef: AngularFirestoreDocument<any> = this._fireStore.doc(`users/${user.id}`);
    const userData: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
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
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        alert(error)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this._auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
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
