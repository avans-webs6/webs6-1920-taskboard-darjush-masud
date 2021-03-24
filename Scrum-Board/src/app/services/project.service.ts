import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from '../models/project';
import { map, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ProjectUserService } from "src/app/services/projectuser.service";
import { Subject } from 'rxjs/internal/Subject';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "src/app/models/user";
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AddmembermodalComponent } from 'src/app/components/modals/addmembermodal/addmembermodal.component';
import { ProjectUser } from '../models/projectuser';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private unsubscribe$ = new Subject<void>();


  constructor(private _fireStore: AngularFirestore, private authService: AuthenticationService, private projectUserService: ProjectUserService) { }


  createProject(name, description) {
    return this._fireStore.collection("projects").add({
      name: name,
      description: description,
      userstories: [],
      owner: this.authService.getUserID(),
      ownerName:this.authService.getUserName(),
      members: [this.authService.getUserID()],
      archived: false
    })
    .then(docRef => {
      return docRef.id;
    });
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


  getActiveProjects() {
    return this._fireStore.collection<Project>('projects')
      .snapshotChanges()
      .pipe(map((projects: any[]) => {
        return projects.map(retrievedProject => {
          this.projectUserService.checkIfMemberOfProject(retrievedProject.payload.doc.id, this.authService.getUserID()).pipe(takeUntil(this.unsubscribe$)).subscribe(projectUser => {
            // used for clearing undefineds
            let retrieved = []
            let final = []
            retrieved = projectUser;
            for (let i of retrieved)
              i && final.push(i);
            let retrievedProjectUser = final[0] as ProjectUser;

            if (!retrievedProject.payload.doc.data().archived && (retrievedProjectUser != undefined ||
            retrievedProject.payload.doc.data().owner == this.authService.getUserID())) {
              return {
                id: retrievedProject.payload.doc.id,
                ...retrievedProject.payload.doc.data() as Project
              }
            }
          });
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
          this.projectUserService.checkIfMemberOfProject(retrievedProject.payload.doc.id, this.authService.getUserID())))
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
