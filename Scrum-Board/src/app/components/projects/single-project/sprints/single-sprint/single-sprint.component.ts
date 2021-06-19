import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';
import { Member } from 'src/app/models/member';
import { Sprint } from 'src/app/models/sprint';
import { UserStory } from 'src/app/models/userstory';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { UserService } from 'src/app/services/user.service';
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
  public projectMemberIds: [string?] = []
  public projectMembers: [Member?] = []
  public projectMemberNames: [string?] = []
  public backlog = []
  public todo = []
  public in_progress = []
  public done = []
  public totalStoryPoints = 0;
  public amountOfStoriesDone = 0;
  constructor(private router: ActivatedRoute, private userService: UserService, private projectService: ProjectService, private userstoryService: UserStoryService, public dialog: MatDialog, public authService: AuthenticationService, private sprintService: SprintService) { }

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

      this.projectService.getProjectByID(this.sprint.projectId).pipe(takeUntil(this.unsubscribe$)).subscribe(project => {
        thisClass.projectMemberIds = []
		thisClass.projectMembers = [];
		thisClass.projectMemberNames = []
        // used for clearing undefineds
        let outputProject = []
        let correctProject = []
        outputProject = project;
        for (let i of outputProject)
          i && correctProject.push(i);

		let currProject = correctProject[0];
		let projectMembers = currProject['members'];
		
        projectMembers.forEach(member => {
          thisClass.userService.getUserByID(member['userId']).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
            // used for clearing undefineds
            let outputMembers = []
            let members = []
            outputMembers = user;
            for (let i of outputMembers)
              i && members.push(i);

            let currentMember = members[0]

            thisClass.projectMemberIds.push(currentMember.id);
			thisClass.projectMembers.push({ userId: currentMember.id, role: member['role']})
            thisClass.projectMemberNames.push(currentMember.name);
          });
        });
      });

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
        thisClass.sprintUserStories.forEach(userStory=> {
          thisClass.totalStoryPoints += parseInt(userStory.storypoints);
        });
      });


      this.userstoryService.getSprintUserStories(thisClass.sprint).pipe(takeUntil(this.unsubscribe$)).subscribe(stories => {
		this.todo = []
		this.in_progress = []
		this.done = []
        this.amountOfStoriesDone = 0;
        let outputUserstory = []
        let correctUserstory = []
        outputUserstory = stories;
        for (let i of outputUserstory) {
          i && correctUserstory.push(i);
        }

        correctUserstory.forEach(story => {
          if (story.status == UserStoryStatus.backlog.toString()) {
            this.backlog.push(story)
          } else if (story.status == UserStoryStatus.todo.toString()) {
            this.todo.push(story)
          } else if (story.status == UserStoryStatus.in_progress.toString()) {
            this.in_progress.push(story);
          } else if (story.status == UserStoryStatus.done.toString()) {
            this.done.push(story)
            this.amountOfStoriesDone = this.done.length;
			console.log("amount done: ", this.amountOfStoriesDone)
          }
        });
      });

	  this.userstoryService.getUnassignedUserStory(thisClass.sprint).pipe(takeUntil(this.unsubscribe$)).subscribe(toBacklog => {
		this.backlog = []
		let outputStories = []
        let toBacklogStories = []
        outputStories = toBacklog;
        for (let i of outputStories) {
          i && toBacklogStories.push(i);
        }

		toBacklogStories.forEach(story => {
			this.backlog.push(story);
		});
	  });

    });
  
  }

}
