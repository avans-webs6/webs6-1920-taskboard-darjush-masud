import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Sprint } from '../models/sprint';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  
  constructor(private _fireStore: AngularFirestore, private authService: AuthenticationService) { }


  createSprint(name, description, startdate,enddate,projectID) {
    this._fireStore.collection("sprints").add({
      name: name,
      description: description,
      startdate: startdate,
      enddate: enddate,
      projectId: projectID,
      archived: false
    })
  }


  


  getSprintByID(id: string) {
    return this._fireStore.collection<Sprint>('sprints')
      .snapshotChanges()
      .pipe(map((sprints: any[]) => {
        return sprints.map(retrievedSprint => {
          if (retrievedSprint.payload.doc.id == id)
            return {
              id: retrievedSprint.payload.doc.id,
              ...retrievedSprint.payload.doc.data() as Sprint
            }
        });
      }));
  }

  getActiveSprint(projectId) {
    return this._fireStore.collection<Sprint>('sprints')
      .snapshotChanges()
      .pipe(map((sprints: any[]) => {
        return sprints.map(retrievedSprint => {
          if (!retrievedSprint.payload.doc.data().archived &&
          retrievedSprint.payload.doc.data().projectId == projectId)

            return {
              id: retrievedSprint.payload.doc.id,
              ...retrievedSprint.payload.doc.data() as Sprint
            }
        });
      }));
  }


  getArchivedSprints(projectId) {
    return this._fireStore.collection<Sprint>('sprints')
      .snapshotChanges()
      .pipe(map((sprints: any[]) => {
        return sprints.map(retrievedSprint => {
          if (retrievedSprint.payload.doc.data().archived &&
          retrievedSprint.payload.doc.data().projectId == projectId)
            return {
              id: retrievedSprint.payload.doc.id,
              ...retrievedSprint.payload.doc.data() as Sprint
            }
        });
      }));
  }


  updateSprint(sprint: Sprint) {
    this._fireStore.collection<Sprint>('sprints').doc(sprint.id).update(sprint);
  }
}
