import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Observable, Subscription, Subject } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectUserService } from "src/app/services/projectuser.service";
import { auth } from 'firebase';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectModalComponent } from '../modals/createprojectmodal/createprojectmodal.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public userName: String;
  public projects$: Observable<Project[]>;
  public activeProjects = [];
  public inactiveProjects = [];
  public showModal: boolean = false;
  public allActiveProjects: Subscription;
  private unsubscribe$ = new Subject<void>();


  constructor(public authService: AuthenticationService, private projectService: ProjectService, private userService: UserService, private projectUserService: ProjectUserService, public dialog: MatDialog) {



  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  async ngOnInit(): Promise<void> {
    await this.setActiveProjects();
    await this.setArchivedProjects();
  }

  closeCreateModal() {
    this.showModal = false;
  }

  openCreateModal() {
    const createdialog = this.dialog.open(CreateProjectModalComponent, {
      
    });

    createdialog.afterClosed().subscribe(
      result => {
        if (result.event == 'create')
        {
        this.projectService.createProject(result.data.name, result.data.description);
        }
      }
     )
  }



  setActiveProjects() {
    this.allActiveProjects = this.projectService.getActiveProjects().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputProjects = []
      let projects = []
      outputProjects = resp;
      for (let i of outputProjects)
        i && projects.push(i);
      outputProjects = projects;
      this.activeProjects = projects;
    });

  }

  setArchivedProjects() {

    this.allActiveProjects = this.projectService.getArchivedProjects().pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputProjects = []
      let projects = []
      outputProjects = resp;
      for (let i of outputProjects)
        i && projects.push(i);
      outputProjects = projects;
      this.inactiveProjects = projects;
    });

  }

  archiveProject($event) {
    let updatedProject: Project;
     this.activeProjects.forEach(project => {
       if (project.id == $event) {
         updatedProject = project
         updatedProject.archived = true;
         this.projectService.updateProject(updatedProject)
       }
     })

  }

  activateProject($event) {
    let updatedProject: Project;
     this.inactiveProjects.forEach(project => {
       if (project.id == $event) {
         updatedProject = project
         updatedProject.archived = false;
         this.projectService.updateProject(updatedProject)
       }
     })

  }


  createProject($event) {
    this.projectService.createProject($event.name, $event.description).then(id => {
      this.projectService.getProjectByID(id).pipe(takeUntil(this.unsubscribe$)).subscribe(project => {
        // used for clearing undefineds
        let outputMembers = []
        let members = []
        outputMembers = project;
        for (let i of outputMembers)
          i && members.push(i);
        let retrievedProject = members[0] as Project;
        console.log(retrievedProject);

        this.userService.getUserByID(this.authService.getUserID()).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
          // used for clearing undefineds
          let outputMembers = []
          let members = []
          outputMembers = user;
          for (let i of outputMembers)
            i && members.push(i);
          let retrievedUser = members[0] as User;
          console.log(retrievedUser);

          this.projectUserService.createProjectUser(retrievedProject, retrievedUser, "owner");
        });
      });
    });
    this.closeCreateModal();
  }

}
