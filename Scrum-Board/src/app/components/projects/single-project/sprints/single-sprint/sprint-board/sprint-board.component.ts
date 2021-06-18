import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';

import { SprintService } from 'src/app/services/sprint.service';
import { ProjectService } from 'src/app/services/project.service';
import { DatePipe } from '@angular/common';


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
  public projectMembers = [];

  @Input()
  public projectMemberIds = [];

  @Input()
  public backlog = [];

  @Input()
  public done = [];
  public selectedStoryboard: UserStory;

  



  constructor(private userstoryService: UserStoryService ,private projectService: ProjectService,private sprintService: SprintService) { 

  }

  

  ngOnInit(): void {

    
  }

  setSelectedStoryboardElement(selectedItem) {
    this.selectedStoryboard = selectedItem;
  }











  drop(event: any, memberIndex: number): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else if (event.container.id == "Backlog") {
	  this.selectedStoryboard.owner = ""
	  this.selectedStoryboard.ownerName = ""
      this.selectedStoryboard.status = UserStoryStatus.backlog.toString();

      this.userstoryService.updateUserStory(this.selectedStoryboard);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    else if (event.container.id == "Todo") {
	  this.selectedStoryboard.owner = this.projectMemberIds[memberIndex]
	  this.selectedStoryboard.ownerName = this.projectMembers[memberIndex]
      this.selectedStoryboard.status = UserStoryStatus.todo.toString();

      this.userstoryService.updateUserStory(this.selectedStoryboard);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id == "In progress") {
		this.selectedStoryboard.owner = this.projectMemberIds[memberIndex]
		this.selectedStoryboard.ownerName = this.projectMembers[memberIndex]
      this.selectedStoryboard.status = UserStoryStatus.in_progress.toString();



      this.userstoryService.updateUserStory(this.selectedStoryboard);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id == "Done") {
		this.selectedStoryboard.owner = this.projectMemberIds[memberIndex]
		this.selectedStoryboard.ownerName = this.projectMembers[memberIndex]
      this.selectedStoryboard.status = UserStoryStatus.done.toString();



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
