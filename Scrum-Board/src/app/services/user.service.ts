import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _fireStore: AngularFirestore) { }





  async getUserByID(id:string): Promise<string>{
    let userName = "";
    let user = await this._fireStore.collection('users').doc(id).get().toPromise();
    let output = user.data() as User
    userName = output.name

    return userName;
  }
}
