import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore/public_api';
import { Project } from '../models/project';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[];
  private projects$: Observable<any[]>;

  constructor(private _fireStore: AngularFirestore) { }

  getProjects() {
    return this._fireStore.collection<Project>('projects')
    .snapshotChanges()
    .pipe(map((projects: any[]) => {
      return projects.map(retrievedProject => {
        return {
          id: retrievedProject.payload.doc.id,
          ...retrievedProject.payload.doc.data() as Project
        }
      });
    }));
  }

  createProject(project) {
    const projectRef: AngularFirestoreDocument<any> = this._fireStore.doc(`projects/${project.id}`)
    const projectData: Project = {
      id: project.id,
      name: project.name,
      userstories: project.userstories,
      owner: project.owner,
      members: project.members,
      archived: project.archived
    }

    return projectRef.set(Object.assign({}, projectData), {
      merge: true
    })
  }

  updateProject(project: Project) {
    this._fireStore.collection<Project>('projects').doc(project.id).update(project);
  }
}
