import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { User } from '../models/user';
import { ProjectUser } from "../models/projectuser";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectUserService {

  constructor(private _fireStore: AngularFirestore) { }

  createProjectUser(project: Project, user: User, role: string) {
    this._fireStore.collection("projectusers").add({
      project: project,
      user: user,
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
          if (retrievedProjectUser.payload.doc.data().project.id == projectId)
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
          if (retrievedProjectUser.payload.doc.data().user.id == userId)
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

}
