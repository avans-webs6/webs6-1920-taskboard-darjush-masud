import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';

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

  constructor() {
   }

  ngOnInit(): void {
  }

  archiveProject(id:string){
    this.onArchive.emit(id);
  }

}
