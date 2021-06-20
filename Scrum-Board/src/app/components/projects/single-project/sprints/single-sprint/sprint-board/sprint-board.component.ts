import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';

import { SprintService } from 'src/app/services/sprint.service';
import { ProjectService } from 'src/app/services/project.service';
import { DatePipe } from '@angular/common';
import { Sprint } from 'src/app/models/sprint';


@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.sass']
})
export class SprintBoardComponent implements OnInit {
  @Input()
  public userStories: [UserStory];
  @Input()
  public sprint: Sprint;

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

  



  constructor(private userstoryService: UserStoryService, private sprintService: SprintService) { 

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
	  this.selectedStoryboard.donedate = null;
	  this.selectedStoryboard.assigned = false;
      this.selectedStoryboard.status = UserStoryStatus.backlog.toString();
	  this.sprint.userstories = this.sprint.userstories.filter(e => e !== this.selectedStoryboard.id) as [string]


      this.userstoryService.updateUserStory(this.selectedStoryboard);
	  this.sprintService.updateSprint(this.sprint);
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
	  this.selectedStoryboard.donedate = null;
	  this.selectedStoryboard.assigned = true;
      this.selectedStoryboard.status = UserStoryStatus.todo.toString();
	  this.sprint.userstories.push(this.selectedStoryboard.id);

      this.userstoryService.updateUserStory(this.selectedStoryboard);
	  this.sprintService.updateSprint(this.sprint);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id == "In progress") {
		this.selectedStoryboard.owner = this.projectMemberIds[memberIndex]
		this.selectedStoryboard.ownerName = this.projectMembers[memberIndex]
		this.selectedStoryboard.donedate = null;
		this.selectedStoryboard.assigned = true;
      this.selectedStoryboard.status = UserStoryStatus.in_progress.toString();
	  this.sprint.userstories.push(this.selectedStoryboard.id);



      this.userstoryService.updateUserStory(this.selectedStoryboard);
	  this.sprintService.updateSprint(this.sprint);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.container.id == "Done") {
		this.selectedStoryboard.owner = this.projectMemberIds[memberIndex]
		this.selectedStoryboard.ownerName = this.projectMembers[memberIndex]
		this.selectedStoryboard.donedate = new Date();
		this.selectedStoryboard.assigned = true;
      this.selectedStoryboard.status = UserStoryStatus.done.toString();
	  this.sprint.userstories.push(this.selectedStoryboard.id);



      this.userstoryService.updateUserStory(this.selectedStoryboard);
	  this.sprintService.updateSprint(this.sprint);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }


  }
}
