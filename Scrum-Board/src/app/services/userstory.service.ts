import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserStory } from 'src/app/models/userstory';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {


  constructor(private _fireStore: AngularFirestore, private authService: AuthenticationService) { }


  createUserStory(name, description, status, storypoints) {
    this._fireStore.collection("userstories").add({
      name: name,
      description: description,
      status: status,
      storypoints: storypoints,
      owner: this.authService.getUserID(),
      ownerName:this.authService.getUserName(),
      archived: false
    })
  }


  getActiveUserStory() {
    return this._fireStore.collection<UserStory>('userstories')
      .snapshotChanges()
      .pipe(map((userstories: any[]) => {
        return userstories.map(retrievedUserStory => {
          if (!retrievedUserStory.payload.doc.data().archived &&
          (retrievedUserStory.payload.doc.data().owner == this.authService.getUserID() ||
          retrievedUserStory.payload.doc.data().members.includes(this.authService.getUserID())))
            return {
              id: retrievedUserStory.payload.doc.id,
              ...retrievedUserStory.payload.doc.data() as UserStory
            }
        });
      }));
  }


  getUserStoryByID(id: string) {
    return this._fireStore.collection<UserStory>('userstories')
      .snapshotChanges()
      .pipe(map((userstories: any[]) => {
        return userstories.map(retrievedUserStory => {
          if (retrievedUserStory.payload.doc.id == id)
            return {
              id: retrievedUserStory.payload.doc.id,
              ...retrievedUserStory.payload.doc.data() as UserStory
            }
        });
      }));
  }


  getArchivedUserStories() {
    return this._fireStore.collection<UserStory>('userstories')
      .snapshotChanges()
      .pipe(map((userstories: any[]) => {
        return userstories.map(retrievedUserStory => {
          if (retrievedUserStory.payload.doc.data().archived &&
          (retrievedUserStory.payload.doc.data().owner == this.authService.getUserID() ||
          retrievedUserStory.payload.doc.data().members.includes(this.authService.getUserID())))
            return {
              id: retrievedUserStory.payload.doc.id,
              ...retrievedUserStory.payload.doc.data() as UserStory
            }
        });
      }));
  }


  updateUserStory(userstory: UserStory) {
    this._fireStore.collection<UserStory>('userstories').doc(userstory.id).update(userstory);
  }
}
