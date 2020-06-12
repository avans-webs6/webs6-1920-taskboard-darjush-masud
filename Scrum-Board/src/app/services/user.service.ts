import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _fireStore: AngularFirestore) { }





  async getUserByID(id:string): Promise<User> {
    let user = await this._fireStore.collection('users').doc(id).get().toPromise();
    return user.data() as User
  }


   getNotYetJoinedMembers(toBeExcludedMembers: any[]) {
    return this._fireStore.collection<User>('users')
    .snapshotChanges()
    .pipe(map((members: any[]) => {
      return members.map(retrievedMember => {
       if (toBeExcludedMembers != null && !toBeExcludedMembers.includes(retrievedMember.id))
          return {
            id: retrievedMember.payload.doc.id,
            ...retrievedMember.payload.doc.data() as User
          }
      });
    }));
  }
}
