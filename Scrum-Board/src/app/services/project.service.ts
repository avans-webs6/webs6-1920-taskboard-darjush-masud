import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  constructor(private _fireStore: AngularFirestore, private authService: AuthenticationService) { }


  createProject(name, description) {
    this._fireStore.collection("projects").add({
      name: name,
      description: description,
      owner: this.authService.getUserID(),
      ownerName:this.authService.getUserName(),
      members: [this.authService.getUserID()],
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


  getProjectByID(id: string) {
    return this._fireStore.collection<Project>('projects')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProject => {
          if (retrievedProject.payload.doc.id == id)
            return {
              id: retrievedProject.payload.doc.id,
              ...retrievedProject.payload.doc.data() as Project
            }
        });
      }));
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
