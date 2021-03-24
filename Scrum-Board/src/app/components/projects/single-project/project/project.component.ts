import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/project';
import { User } from "src/app/models/user";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectUserService } from "src/app/services/projectuser.service";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddmembermodalComponent } from 'src/app/components/modals/addmembermodal/addmembermodal.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  public project: Project;
  public projectMemberIds: [string?] = []
  public projectMembers: [string?] = []
  public projectMemberRoles: [string?] = []
  public canBeAddedMembers: any[]
  public showModal: boolean = false;
  private unsubscribe$ = new Subject<void>();
  private projectID: string;


  constructor(private router: ActivatedRoute, private projectService: ProjectService,
    public authService: AuthenticationService, private userService: UserService, private projectUserService: ProjectUserService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.projectID = this.router.snapshot.paramMap.get('id');
    this.retrieveMembers(this.projectID);
  }

  closeModal() {
    this.showModal = false;
  }

  openAddModal() {
    const adddialog = this.dialog.open(AddmembermodalComponent, {
      data: this.canBeAddedMembers
    });

    adddialog.afterClosed().subscribe(
      result => {
        if (result.event == 'create')
        {
          let newUserId = result.data.name;
          if (newUserId != "")
            this.addMember(newUserId);
        }
      }
     )
  }

  addMember($event) {
    this.projectService.getProjectByID(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(project => {
      // used for clearing undefineds
      let retrieved = []
      let final = []
      retrieved = project;
      for (let i of retrieved)
        i && final.push(i);
      let retrievedProject = final[0] as Project;

      this.userService.getUserByID($event).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
        // used for clearing undefineds
        let retrieved = []
        let final = []
        retrieved = user;
        for (let i of retrieved)
          i && final.push(i);
        let retrievedUser = final[0] as User;

        this.projectUserService.createProjectUser(retrievedProject.id, retrievedUser.id, "developer");
      });
    });
    this.closeModal();
  }

  retrieveMembers(projectId: string) {
    let thisClass = this;
    this.projectService.getProjectByID(projectId).pipe(takeUntil(this.unsubscribe$)).subscribe(project => {
      // used for clearing undefineds
      let retrieved = []
      let final = []
      retrieved = project;
      for (let i of retrieved)
        i && final.push(i);

      thisClass.project = final[0];
      thisClass.projectMembers = [];

      this.projectUserService.getProjectUsersByProjectId(projectId).pipe(takeUntil(this.unsubscribe$)).subscribe(projectUsers => {
        // used for clearing undefineds
        let retrieved = []
        let final = []
        retrieved = projectUsers;
        for (let i of retrieved)
          i && final.push(i);

        final.forEach(projectUser => {
          thisClass.userService.getUserByID(projectUser.userId).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
            // used for clearing undefineds
            let retrieved = []
            let final = []
            retrieved = user;
            for (let i of retrieved)
              i && final.push(i);

            thisClass.projectMemberIds.push(final[0].id);
            thisClass.projectMembers.push(final[0].name);
            thisClass.projectMemberRoles.push(projectUser.role);

            this.userService.getNotYetJoinedMembers(this.projectMemberIds).pipe(takeUntil(this.unsubscribe$)).subscribe(memberArray => {
              // used for clearing undefineds
              let retrieved = []
              let final = []
              retrieved = memberArray;
              for (let i of retrieved)
                i && final.push(i);

              this.canBeAddedMembers = final;
            });
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
