import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';
import { Sprint } from 'src/app/models/sprint';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
	selector: 'app-sprint-board',
	templateUrl: './sprint-board.component.html',
	styleUrls: ['./sprint-board.component.sass']
})
export class SprintBoardComponent implements OnInit, OnChanges {
	@Input()
	public userStories: [UserStory];
  @Input()
	public sprint: Sprint;
	public todo = [];
	public in_progress = [];
	public done = [];
  public  selectedStoryboard: UserStory;

	constructor(private userstoryService: UserStoryService,private sprintService: SprintService) { }

	ngOnInit(): void {

	}

  setSelectedStoryboardElement(selectedItem) {
    this.selectedStoryboard = selectedItem;
  }

	ngOnChanges(changes: SimpleChanges) {
    console.log('ngonChange');
		if (changes.userStories) {
			this.userStories.forEach(userstory => {
				if (userstory.status == UserStoryStatus.todo.toString()) {
					this.todo.push(userstory)
          console.log(this.todo);
				} else if (userstory.status == UserStoryStatus.in_progress.toString()) {
					this.in_progress.push(userstory);
				} else if (userstory.status == UserStoryStatus.done.toString()) {
					this.done.push(userstory)
				}
			});
		}
	}



  drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else if(event.container.id == "Todo")
    {
      this.sprint.userstories.splice(this.sprint.userstories.findIndex(id => id == this.selectedStoryboard.id), 1);
      this.selectedStoryboard.status = UserStoryStatus.todo.toString();
      this.sprint.userstories.push(this.selectedStoryboard.id);
      

      //todo turn userstories string array to object array
      this.sprintService.changeTaskboardStatus(this.selectedStoryboard, this.sprint.userstories, this.sprint.id);

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
