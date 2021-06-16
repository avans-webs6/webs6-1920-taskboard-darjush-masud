import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  private unsubscribe$ = new Subject<void>();

  constructor(private userstoryService: UserStoryService, private sprintService: SprintService) { }

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
      this.sprint.userstories.splice(this.sprint.userstories.findIndex(id => id == this.selectedStoryboard.id), 1);
      this.selectedStoryboard.status = UserStoryStatus.todo.toString();
      this.sprint.userstories.push(this.selectedStoryboard.id);


      //todo turn userstories string array to object array
      this.sprintService.changeTaskboardStatus(this.selectedStoryboard, this.sprint.userstories, this.sprint.id);

    } else if (event.container.id == "In progress") {
      console.log(event.container.id);
      this.sprint.userstories.splice(this.sprint.userstories.findIndex(id => id == this.selectedStoryboard.id), 1);
      this.selectedStoryboard.status = UserStoryStatus.in_progress.toString();
      this.sprint.userstories.push(this.selectedStoryboard.id);


      //todo turn userstories string array to object array
      //this.sprintService.changeTaskboardStatus(this.selectedStoryboard, this.sprint.userstories, this.sprint.id);

    } else if (event.container.id == "Done") {
      console.log(event.container.id);
      this.sprint.userstories.splice(this.sprint.userstories.findIndex(id => id == this.selectedStoryboard.id), 1);
      this.selectedStoryboard.status = UserStoryStatus.in_progress.toString();
      this.sprint.userstories.push(this.selectedStoryboard.id);


      //todo turn userstories string array to object array
      //this.sprintService.changeTaskboardStatus(this.selectedStoryboard, this.sprint.userstories, this.sprint.id);

    }

    // const item = event.previousContainer.data[event.previousIndex];
    // this.store.firestore.runTransaction(() => {
    //   const promise = Promise.all([
    //     this.store.collection(event.previousContainer.id).doc(item.id).delete(),
    //     this.store.collection(event.container.id).add(item),
    //   ]);
    //   return promise;
    // });
    // transferArrayItem(
    //   event.previousContainer.data,
    //   event.container.data,
    //   event.previousIndex,
    //   event.currentIndex
    // );
  }
}
