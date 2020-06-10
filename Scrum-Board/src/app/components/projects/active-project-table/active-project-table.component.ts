import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-active-project-table',
  templateUrl: './active-project-table.component.html',
  styleUrls: ['./active-project-table.component.sass']
})
export class ActiveProjectTableComponent implements OnInit {
  public activeProjects= [];

  constructor() {
    let projectOne = {name: "project 1", description: "First project", members: 7};
    let projectTwo = {name: "project 2", description: "Second project", members: 8};

    this.activeProjects.push(projectOne);
    this.activeProjects.push(projectTwo);
   }

  ngOnInit(): void {
  }

}
