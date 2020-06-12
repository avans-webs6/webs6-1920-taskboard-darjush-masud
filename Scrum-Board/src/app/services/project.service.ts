import { Injectable } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthenticationService } from './authentication.service';
import { strict } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects: Project[];
  private projects$: Observable<any[]>;

  constructor(private _fireStore: AngularFirestore, private authService: AuthenticationService) { }



  createProject(name, description) {
    this._fireStore.collection("projects").add({
      name: name,
      description: description,
      userstories: [],
      owner: this.authService.getUserID(),
      ownerName:this.authService.getUserName(),
      members: [],
      archived: false
    })

  }

  getActiveProjects() {
    return this._fireStore.collection<Project>('projects')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProject => {
          if (!retrievedProject.payload.doc.data().archived && 
          (retrievedProject.payload.doc.data().owner == this.authService.getUserID() || 
          retrievedProject.payload.doc.data().members.includes(this.authService.getUserID())))
            return {
              id: retrievedProject.payload.doc.id,
              ...retrievedProject.payload.doc.data() as Project
            }
        });
      }));
  }

  async getProjectByID(id: string): Promise<Project> {
    let project = await this._fireStore.collection('projects').doc(id).get().toPromise();
    return project.data() as Project;
  }


  getArchivedProjects() {
    return this._fireStore.collection<Project>('projects')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProject => {
          if (retrievedProject.payload.doc.data().archived && 
          (retrievedProject.payload.doc.data().owner == this.authService.getUserID() || 
          retrievedProject.payload.doc.data().members.includes(this.authService.getUserID())))
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
