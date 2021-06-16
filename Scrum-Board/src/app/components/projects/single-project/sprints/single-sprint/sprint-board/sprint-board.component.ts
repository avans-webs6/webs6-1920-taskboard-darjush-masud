import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';

import { SprintService } from 'src/app/services/sprint.service';
import { ProjectService } from 'src/app/services/project.service';


@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.sass']
})
export class SprintBoardComponent implements OnInit {
  @Input()
  public userStories: [UserStory];
  @Input()
  public sprint: any;

  @Input()
  public todo = [];

  @Input()
  public in_progress = [];

  @Input()
  public done = [];
  public selectedStoryboard: UserStory;
  public projectMembers: [string?] = []


  constructor(private userstoryService: UserStoryService ,private projectService: ProjectService,private sprintService: SprintService) { }

  ngOnInit(): void {


  }

  setSelectedStoryboardElement(selectedItem) {
    this.selectedStoryboard = selectedItem;
  }











  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else if (event.container.id == "Todo") {
      console.log(event.container.id);
      this.selectedStoryboard.status = UserStoryStatus.todo.toString();

      this.userstoryService.updateUserStory(this.selectedStoryboard);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id == "In progress") {
      this.selectedStoryboard.status = UserStoryStatus.in_progress.toString();



      this.userstoryService.updateUserStory(this.selectedStoryboard);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id == "Done") {
      this.selectedStoryboard.status = UserStoryStatus.in_progress.toString();



      this.userstoryService.updateUserStory(this.selectedStoryboard);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }


  }
}
