import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Observable, Subscription, Subject } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { auth } from 'firebase';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public userName: String;
  public projects$: Observable<Project[]>;
  public activeProjects = [];
  public inActiveProjects = [];
  public showModal: boolean = false;
  public allActiveProjects: Subscription;
  private unsubscribe$ = new Subject<void>();


  constructor(public authService: AuthenticationService, private projectService: ProjectService) {



  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async ngOnInit(): Promise<void> {
    await this.setActiveProjects();
    await this.setArchivedProjects();
  }

  closeModal() {
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;

  }

  async setActiveProjects() {

    let thisClass = this;
    this.allActiveProjects = await this.projectService.getActiveProjects().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputProjects = []
      let projects = []
      outputProjects = resp;
      for (let i of outputProjects)
        i && projects.push(i); // copy each non-empty value to the 'temp' array
      outputProjects = projects;
      this.activeProjects = outputProjects;
    });

  }

  async setArchivedProjects() {

    let thisClass = this;
    this.allActiveProjects = await this.projectService.getArchivedProjects().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputProjects = []
      let projects = []
      outputProjects = resp;
      for (let i of outputProjects)
        i && projects.push(i); // copy each non-empty value to the 'temp' array
      outputProjects = projects;
      this.inActiveProjects = outputProjects;
    });

  }

  archiveProject($event){
    let updatedProject: Project;
     this.activeProjects.forEach(project => {
       if (project.id == $event){
         updatedProject = project
         updatedProject.archived = true;
         this.projectService.updateProject(updatedProject)
       }
     })
    
  }

  activateProject($event){
    let updatedProject: Project;
     this.inActiveProjects.forEach(project => {
       if (project.id == $event){
         updatedProject = project
         updatedProject.archived = false;
         this.projectService.updateProject(updatedProject)
       }
     })
    
  }


  createProject($event) {
    this.projectService.createProject($event.name, $event.description);
    this.closeModal();
  }

}
