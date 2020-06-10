import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public userName:String;
  public projects$: Observable<Project[]>;

  constructor(public authService: AuthenticationService, private projectService: ProjectService) {
    this.projects$ = this.projectService.getProjects();
  }





  ngOnInit() {

    console.log(this.authService)

    // let email = this.user.email;
    // let name = email.split("@");
    // this.userName = name[0];




  }

}
