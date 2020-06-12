import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-active-project-table',
  templateUrl: './active-project-table.component.html',
  styleUrls: ['./active-project-table.component.sass']
})
export class ActiveProjectTableComponent implements OnInit {
  @Input()
  public activeProjects: [Project];

  @Output()
  onArchive = new EventEmitter();

  constructor(private router: Router, public userService: UserService) {

  }

  ngOnInit(): void {

  }

  archiveProject(id: string){
    this.onArchive.emit(id);
  }

  navigateToProject(id){
    this.router.navigate([`project/${id}`]);
  }

}
