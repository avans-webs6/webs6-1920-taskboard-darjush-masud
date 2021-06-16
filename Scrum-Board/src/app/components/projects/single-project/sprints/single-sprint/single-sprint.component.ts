import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdduserstorytosprintmodalComponent } from 'src/app/components/modals/sprint/adduserstorytosprintmodal/adduserstorytosprintmodal.component';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';
import { Sprint } from 'src/app/models/sprint';
import { UserStory } from 'src/app/models/userstory';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SprintService } from 'src/app/services/sprint.service';
import { UserStoryService } from 'src/app/services/userstory.service';

@Component({
  selector: 'app-single-sprint',
  templateUrl: './single-sprint.component.html',
  styleUrls: ['./single-sprint.component.sass']
})
export class SingleSprintComponent implements OnInit {

  private sprintID: string;
  public sprint: Sprint;
  public canBeAddedUserstories: any[] = []
  private unsubscribe$ = new Subject<void>();
  public sprintUserStories: any[] = []
  public todo = [];
  public in_progress = [];
  public done = [];
  constructor(private router: ActivatedRoute, private userstoryService: UserStoryService, public dialog: MatDialog, public authService: AuthenticationService, private sprintService: SprintService) { }

  	ngOnInit(): void {
		this.sprintID = this.router.snapshot.paramMap.get('id');
		let thisClass = this;
		this.sprintService.getSprintByID(this.sprintID).pipe(takeUntil(this.unsubscribe$)).subscribe(sprint => {
			let outputSprints = []
			let sprints = []
			outputSprints = sprint;
			for (let i of outputSprints)
				i && sprints.push(i);

			thisClass.sprint = sprints[0];

			this.userstoryService.getUnassignedUserStory(this.sprint).pipe(takeUntil(this.unsubscribe$)).subscribe(userstory => {
				let outputUserstory = []
				let userstories = []
				outputUserstory = userstory;
				for (let i of outputUserstory) {
				i && userstories.push(i);
				}

				thisClass.canBeAddedUserstories = userstories;
			});

			this.userstoryService.getSprintUserStories(thisClass.sprint).pipe(takeUntil(this.unsubscribe$)).subscribe(userstories => {
				let outputUserstory = []
				let filteredStories = []
				outputUserstory = userstories;
				for (let i of outputUserstory) {
					i && filteredStories.push(i);
				}

				thisClass.sprintUserStories = filteredStories;
			});


      this.userstoryService.getSprintUserStories(thisClass.sprint).pipe(takeUntil(this.unsubscribe$)).subscribe(stories => {
        this.todo = [];
        this.in_progress = [];
        this.done = [];
        let outputUserstory = []
        let correctUserstory = []
        outputUserstory = stories;
        for (let i of outputUserstory) {
          i && correctUserstory.push(i);
        }

        correctUserstory.forEach(story => {
          if (story.status == UserStoryStatus.todo.toString()) {
            this.todo.push(story)
          } else if (story.status == UserStoryStatus.in_progress.toString()) {
            this.in_progress.push(story);
          } else if (story.status == UserStoryStatus.done.toString()) {
            this.done.push(story)
          }
        });
      });

		});
  	}




  openAddUserStoryModal() {
    const adddialog = this.dialog.open(AdduserstorytosprintmodalComponent, {
      data: this.canBeAddedUserstories
    });

    adddialog.afterClosed().subscribe(
      result => {
        if (result.event == 'create') {
          this.sprint.userstories.push(result.data.name);
          this.sprintService.updateSprint(this.sprint);

          this.userstoryService.getUserStoryByID(result.data.name).pipe(takeUntil(this.unsubscribe$)).subscribe(userstory => {
            let outputUserstory = []
            let correctUserstory = []
            outputUserstory = userstory;
            for (let i of outputUserstory) {
              i && correctUserstory.push(i);
            }

            let toBeUpdatedUserstory = correctUserstory[0];
            toBeUpdatedUserstory.assigned = true;

            this.userstoryService.updateUserStory(toBeUpdatedUserstory);
          });
        }
      }
    )
  }
}
