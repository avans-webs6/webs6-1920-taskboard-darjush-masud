import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/models/project';

@Component({
  selector: 'app-archived-project-table',
  templateUrl: './archived-project-table.component.html',
  styleUrls: ['./archived-project-table.component.sass']
})
export class ArchivedProjectTableComponent implements OnInit {
  @Input()
  public archivedProjects: [Project];
  

  @Output()
  onActivate = new EventEmitter();

  constructor() { 
 
  }

  ngOnInit(): void {
  }

  activateProject(id:string){
    this.onActivate.emit(id);
  }

}
