import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProjectUser } from "../models/projectuser";
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {

  private unsubscribe$ = new Subject<void>();

  constructor(private _fireStore: AngularFirestore) { }

  createProjectUser(projectId: string, userId: string, role: string) {
    this._fireStore.collection("projectusers").add({
      projectId: projectId,
      userId: userId,
      role: role
    });
  }

  // get all
  getProjectUsers() {
    return this._fireStore.collection<ProjectUser>('projectusers')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProjectUser => {
          return {
            id: retrievedProjectUser.payload.doc.id,
            ...retrievedProjectUser.payload.doc.data() as ProjectUser
          }
        });
      }));
  }

  // get by project id
  getProjectUsersByProjectId(projectId: string) {
    return this._fireStore.collection<ProjectUser>('projectusers')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProjectUser => {
          if (retrievedProjectUser.payload.doc.data().projectId == projectId)
            return {
              id: retrievedProjectUser.payload.doc.id,
              ...retrievedProjectUser.payload.doc.data() as ProjectUser
            }
        });
      }));
  }

  // get by user id
  getProjectUsersByUserId(userId: string) {
    return this._fireStore.collection<ProjectUser>('projectusers')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProjectUser => {
          if (retrievedProjectUser.payload.doc.data().userId == userId)
            return {
              id: retrievedProjectUser.payload.doc.id,
              ...retrievedProjectUser.payload.doc.data() as ProjectUser
            }
        });
      }));
  }

  // update
  updateProjectUser(projectUser: ProjectUser) {
    this._fireStore.collection<ProjectUser>('projectusers').doc(projectUser.id).update(projectUser);
  }

  // remove
  removeProjectUser(projectUser: ProjectUser) {
    this._fireStore.collection<ProjectUser>('projectusers').doc(projectUser.id).delete();
  }

  checkIfMemberOfProject(projectId: string, userId: string) {
    return this._fireStore.collection<ProjectUser>('projectusers')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProjectUser => {
          if (retrievedProjectUser.payload.doc.data().projectId == projectId && retrievedProjectUser.payload.doc.data().userId == userId)
            return {
              id: retrievedProjectUser.payload.doc.id,
              ...retrievedProjectUser.payload.doc.data() as ProjectUser
          }
        });
      }));
  }

}
