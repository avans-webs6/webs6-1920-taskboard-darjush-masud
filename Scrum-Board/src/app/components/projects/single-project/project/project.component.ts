import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddmembermodalComponent } from 'src/app/components/modals/addmembermodal/addmembermodal.component';
import { AdduserstorymodalComponent } from 'src/app/components/modals/adduserstorymodal/adduserstorymodal.component';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStory } from 'src/app/models/userstory';
import { SprintService } from 'src/app/services/sprint.service';
import { CreatesprintmodalComponent } from 'src/app/components/modals/sprint/createsprintmodal/createsprintmodal.component';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  public project: Project;
  public projectMemberIds: [string?] = []
  public projectMembers: [string?] = []
  public fullMembers: any[];
  public sprints: any[];
  public canBeAddedMembers: any[]
  public memberRoles: [string?] = []
  public showModal: boolean = false;
  private unsubscribe$ = new Subject<void>();
  private projectID: string;
  public activeUserStories = [];
  public archivedUserStories = [];
  public activeSprints = [];
  public archivedSprints = [];
  public allActiveUserStories: Subscription;
  public allActiveSprints: Subscription;


  constructor(private router: ActivatedRoute, private projectService: ProjectService,
    public authService: AuthenticationService, private userStoryService: UserStoryService, private sprintService: SprintService, private userService: UserService, public dialog: MatDialog, private userstoryService: UserStoryService) { }


  ngOnInit(): void {
    this.projectID = this.router.snapshot.paramMap.get('id');
    let thisClass = this;
    this.projectService.getProjectByID(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(project => {
      // used for clearing undefineds
      this.memberRoles = []
      let outputMembers = []
      let members = []
      outputMembers = project;
      for (let i of outputMembers)
        i && members.push(i);

      thisClass.project = members[0];
      thisClass.projectMembers = [];
      thisClass.fullMembers = [];

      members[0].members.forEach(member => {
        thisClass.userService.getUserByID(member).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
          // used for clearing undefineds
          let outputMembers = []
          let members = []
          outputMembers = user;
          for (let i of outputMembers)
            i && members.push(i);

          let currentMember = members[0]

          thisClass.projectMemberIds.push(currentMember.id);
          thisClass.projectMembers.push(currentMember.name);
          thisClass.fullMembers.push(currentMember);

          // CHANGE AT A LATER DATE! WORKS, BUT NOT AMAZINGLY!
          if (thisClass.project.owner == currentMember.id) {
            thisClass.memberRoles.push("Owner");
          } else {
            thisClass.memberRoles.push("Developer");
          }

          this.userService.getNotYetJoinedMembers(this.projectMemberIds).pipe(takeUntil(this.unsubscribe$)).subscribe(memberArray => {
            // used for clearing undefineds
            let outputMembers = []
            let members = []
            outputMembers = memberArray;
            for (let i of outputMembers)
              i && members.push(i);

            this.canBeAddedMembers = members;
          });
        });
      });
    });

    this.setActiveUserStories();
    this.setArchivedUserStories();
    this.setActiveSprint();
    this.setArchivedSprints();
  }




  closeModal() {
    this.showModal = false;
  }

  openAddMemberModal() {
    const adddialog = this.dialog.open(AddmembermodalComponent, {
      data: this.canBeAddedMembers
    });

    adddialog.afterClosed().subscribe(
      result => {
        if (result.event == 'create') {
          this.project.members.push(result.data.name);
          this.project.id = this.projectID;
          this.projectService.updateProject(this.project);
        }
      }
    )
  }

  openAddUserStoryModal() {
    const adddialog = this.dialog.open(AdduserstorymodalComponent, {
      data: this.fullMembers
    });

    adddialog.afterClosed().subscribe(
      result => {
        if (result.event == 'create') {
          this.userstoryService.createUserStory(result.data.name, result.data.description, result.data.status, result.data.storypoints, this.projectID, result.data.owner, result.data.ownerName);
        }
      }
    )
  }


  openAddSprintModal() {
    const adddialog = this.dialog.open(CreatesprintmodalComponent, {
      data: this.sprints
    });

    adddialog.afterClosed().subscribe(
      result => {
        if (result.event == 'create' && this.activeSprints.length < 1) {
          this.sprintService.createSprint(result.data.name, result.data.description, result.data.startdate, result.data.enddate, this.projectID);
        }
        else if(result.event == 'create'){
          this.sprintService.createSprint(result.data.name, result.data.description, result.data.startdate, result.data.enddate, this.projectID,true);

        }
      }
    )
  }

  archiveUserStory($event) {
    let updatedUserStory: UserStory;
    this.activeUserStories.forEach(userStory => {
      if (userStory.id == $event) {
        updatedUserStory = userStory
        updatedUserStory.archived = true;
        this.userStoryService.updateUserStory(updatedUserStory)
      }
    })

  }

  archiveSprint($event) {
    let updatedSprint: Sprint;
    this.activeSprints.forEach(sprint => {
      if (sprint.id == $event) {
        updatedSprint = sprint
        updatedSprint.archived = true;
        this.sprintService.updateSprint(updatedSprint)
      }
    })

  }

  activateUserStory($event) {

    let updatedUserStory: UserStory;
    this.archivedUserStories.forEach(userStory => {
      if (userStory.id == $event) {
        updatedUserStory = userStory
        updatedUserStory.archived = false;
        this.userStoryService.updateUserStory(updatedUserStory)
      }
    })

  }

  activateSprint($event) {
    let updatedSprint: Sprint;
    if (this.activeSprints.length == 0) {
      this.archivedSprints.forEach(sprint => {
        if (sprint.id == $event) {
          updatedSprint = sprint
          updatedSprint.archived = false;
          this.sprintService.updateSprint(updatedSprint)
        }
      })
    } else {
      alert('There is already an active sprint');
    }

  }




  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setActiveUserStories() {
    this.allActiveUserStories = this.userStoryService.getActiveUserStory(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputUserStories = []
      let userStories = []
      outputUserStories = resp;
      for (let i of outputUserStories)
        i && userStories.push(i);
      outputUserStories = userStories;
      this.activeUserStories = userStories;
    });
  }

  setActiveSprint() {
    this.allActiveSprints = this.sprintService.getActiveSprint(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputSprints = [];
      let sprints = []
      outputSprints = resp;
      for (let i of outputSprints)
        i && sprints.push(i);
      outputSprints = sprints;
      this.activeSprints = sprints;

    });

  }

  setArchivedSprints() {
    this.allActiveSprints = this.sprintService.getArchivedSprints(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputSprints = [];
      let sprints = []
      outputSprints = resp;
      for (let i of outputSprints)
        i && sprints.push(i);
      outputSprints = sprints;
      this.archivedSprints = sprints;

    });
  }


  setArchivedUserStories() {
    this.allActiveUserStories = this.userStoryService.getArchivedUserStories(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputUserStories = []
      let userStories = []
      outputUserStories = resp;
      for (let i of outputUserStories)
        i && userStories.push(i);
      outputUserStories = userStories;
      this.archivedUserStories = userStories;
    });
  }

}
