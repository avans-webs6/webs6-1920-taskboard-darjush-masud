import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archived-project-table',
  templateUrl: './archived-project-table.component.html',
  styleUrls: ['./archived-project-table.component.sass']
})
export class ArchivedProjectTableComponent implements OnInit {
  public inActiveProjects= [];

  constructor() { 
    let projectOneDone = {name: "project 13", description: "Finished project", members: 9};
    let projectTwoDone = {name: "project 23", description: "Finished project", members: 10};

    this.inActiveProjects.push(projectOneDone);
    this.inActiveProjects.push(projectTwoDone);
  }

  ngOnInit(): void {
  }

}
