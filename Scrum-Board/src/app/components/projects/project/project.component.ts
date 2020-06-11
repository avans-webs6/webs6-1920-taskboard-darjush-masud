import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  public project:Project;
  constructor(private router: ActivatedRoute, private projectService: ProjectService) { }
 
  ngOnInit(): void {
    let projectID = this.router.snapshot.paramMap.get('id');
    let thisClass= this;
    this.projectService.getProjectByID(projectID).then(resp => {
      thisClass.project = resp;
      console.log(thisClass.project);
    });
  }

}
