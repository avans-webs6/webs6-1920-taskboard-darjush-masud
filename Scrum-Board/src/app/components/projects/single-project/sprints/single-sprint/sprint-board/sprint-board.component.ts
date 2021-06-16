import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';

@Component({
	selector: 'app-sprint-board',
	templateUrl: './sprint-board.component.html',
	styleUrls: ['./sprint-board.component.sass']
})
export class SprintBoardComponent implements OnInit, OnChanges {
	@Input()
	public userStories: [UserStory];
	public todo = [];
	public in_progress = [];
	public review = [];
	public done = [];

	constructor(private userstoryService: UserStoryService) { }

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.userStories) {
			this.userStories.forEach(userstory => {
				if (userstory.status == UserStoryStatus.todo.toString()) {
					this.todo.push(userstory.name)
				} else if (userstory.status == UserStoryStatus.in_progress.toString()) {
					this.in_progress.push(userstory.name)
				} else if (userstory.status == UserStoryStatus.done.toString()) {
					this.done.push(userstory.name)
				}
			});
		}
	}
}
