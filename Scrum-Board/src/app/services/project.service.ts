import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[];
  private projects$: Observable<any[]>;

  constructor(private _fireStore: AngularFirestore, private authService: AuthenticationService) { }

  getProjects() {
    return this._fireStore.collection<Project>('projects')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProject => {
          if (retrievedProject.payload.doc.data().archived)
          return {
            id: retrievedProject.payload.doc.id,
            ...retrievedProject.payload.doc.data() as Project
          }
        });
      }));
  }

  createProject(name, description) {
    this._fireStore.collection("projects").add({
      name: name,
      description: description,
      userstories: [""],
      owner: this.authService.getUserID(),
      members: [""],
      archived: false
    })

  }

  getActiveProjects(){
    return this._fireStore.collection<Project>('projects')
    .snapshotChanges()
    .pipe(map((projects: any[]) => {
      return projects.map(retrievedProject => {
        if (!retrievedProject.payload.doc.data().archived)
        return {
          id: retrievedProject.payload.doc.id,
          ...retrievedProject.payload.doc.data() as Project
        }
      });
    }));
  }

  getArchivedProjects(){
    return this._fireStore.collection<Project>('projects')
    .snapshotChanges()
    .pipe(map((projects: any[]) => {
      return projects.map(retrievedProject => {
        if (retrievedProject.payload.doc.data().archived)
        return {
          id: retrievedProject.payload.doc.id,
          ...retrievedProject.payload.doc.data() as Project
        }
      });
    }));
  }

  updateProject(project: Project) {
    this._fireStore.collection<Project>('projects').doc(project.id).update(project);
  }
}
