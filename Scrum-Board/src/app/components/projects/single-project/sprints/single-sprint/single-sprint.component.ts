import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdduserstorytosprintmodalComponent } from 'src/app/components/modals/sprint/adduserstorytosprintmodal/adduserstorytosprintmodal.component';
import { Sprint } from 'src/app/models/sprint';
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
  public canBeAddedUserstories: any[]
  private unsubscribe$ = new Subject<void>();
  public sprintUserStories:[string?] = []
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
      //console.log(thisClass.sprint);

      this.userstoryService.getActiveUserStory(this.sprint.projectId).pipe(takeUntil(this.unsubscribe$)).subscribe(userstory => {
        let outputUserstory = []
        let userstories = []
        outputUserstory = userstory;
        for (let i of outputUserstory) {
          i && userstories.push(i);
        }

        this.canBeAddedUserstories = userstories;
        console.log('canbeadded ',this.canBeAddedUserstories);

        // let userstoriesArray = [];
        // this.userStories.forEach(userstory =>{
        //   userstoriesArray.push(this.userstoryService.getUserStoryByID(userstory));
        //   console.log('my user story: ',userstory);
        // });
        // this.userStoryArray = userstoriesArray;
        // console.log(this.userStoryArray);
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
        }
      }
    )
  }

}
