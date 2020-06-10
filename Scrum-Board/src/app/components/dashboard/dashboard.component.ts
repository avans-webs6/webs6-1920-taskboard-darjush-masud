import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { auth } from 'firebase';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public userName: String;
  public projects$: Observable<Project[]>;
  public activeProjects = [];
  public inActiveProjects = [];
  public showModal: boolean = false;


  constructor(public authService: AuthenticationService, private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
    let projectOne = { name: "project 1", description: "First project", members: 7 };
    let projectTwo = { name: "project 2", description: "Second project", members: 8 };

    this.activeProjects.push(projectOne);
    this.activeProjects.push(projectTwo);

    let projectOneDone = { name: "project 13", description: "Finished project", members: 9 };
    let projectTwoDone = { name: "project 23", description: "Finished project", members: 10 };

    this.inActiveProjects.push(projectOneDone);
    this.inActiveProjects.push(projectTwoDone);
  }

  async ngOnInit(): Promise<void> {

  }

  closeModal() {
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;
    let myArray = []
    let projects = []
    this.projectService.getProjects().subscribe(resp => {
      myArray = resp;
      for (let i of myArray)
        i && projects.push(i); // copy each non-empty value to the 'temp' array
      myArray = projects;
      console.log(myArray);
    });
  }

  createProject($event) {
    this.projectService.createProject($event.name, $event.description);
    this.closeModal();
  }

}
