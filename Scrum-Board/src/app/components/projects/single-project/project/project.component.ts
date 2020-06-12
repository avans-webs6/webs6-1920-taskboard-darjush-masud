import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  public project:Project;
  public projectMembers = [];
  constructor(private router: ActivatedRoute, private projectService: ProjectService,
    public authService: AuthenticationService,private userService: UserService) { }
 
  ngOnInit(): void {
    let projectID = this.router.snapshot.paramMap.get('id');
    let thisClass= this;
    this.projectService.getProjectByID(projectID).then(resp => {
      thisClass.project = resp;
      resp.members.forEach(member =>{
        thisClass.userService.getUserByID(member).then(resp => {
          thisClass.projectMembers.push(resp.name);
        });
      });
    });
  }

}
