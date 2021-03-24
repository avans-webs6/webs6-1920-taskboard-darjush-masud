import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _fireStore: AngularFirestore) { }


  getUserByID(id: string) {
    return this._fireStore.collection<User>('users')
      .snapshotChanges()
      .pipe(map((users: any[]) => {
        return users.map(retrievedUser => {
          if (retrievedUser.payload.doc.id == id)
            return {
              id: retrievedUser.payload.doc.id,
              ...retrievedUser.payload.doc.data() as User
            }
        });
      }));
  }


  getNotYetJoinedMembers(toBeExcludedMembers: [string?]) {
    return this._fireStore.collection<User>('users')
    .snapshotChanges()
    .pipe(map((members: any[]) => {
      return members.map(retrievedMember => {
       if (toBeExcludedMembers != null && !toBeExcludedMembers.includes(retrievedMember.payload.doc.id)) {
          return {
            id: retrievedMember.payload.doc.id,
            ...retrievedMember.payload.doc.data() as User
          }
        }
      });
    }));
  }
}
