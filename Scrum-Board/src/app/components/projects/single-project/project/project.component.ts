import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
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
  public canBeAddedMembers: any[]
  public memberRoles: [string?] = []
  public showModal: boolean = false;
  private unsubscribe$ = new Subject<void>();
  private projectID: string;


  constructor(private router: ActivatedRoute, private projectService: ProjectService,
    public authService: AuthenticationService, private userService: UserService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.projectID = this.router.snapshot.paramMap.get('id');
    let thisClass = this;
    this.projectService.getProjectByID(this.projectID).pipe(takeUntil(this.unsubscribe$)).subscribe(project => {
      // used for clearing undefineds
      let outputMembers = []
      let members = []
      outputMembers = project;
      for (let i of outputMembers)
        i && members.push(i);

      thisClass.project = members[0];
      thisClass.projectMembers = [];

      members[0].members.forEach(member => {
        thisClass.userService.getUserByID(member).pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
          // used for clearing undefineds
          let outputMembers = []
          let members = []
          outputMembers = user;
          for (let i of outputMembers)
            i && members.push(i);

          thisClass.projectMemberIds.push(members[0].id);
          thisClass.projectMembers.push(members[0].name);

          // CHANGE AT A LATER DATE! WORKS, BUT NOT AMAZINGLY!
          if (thisClass.project.owner == members[0].id) {
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
          this.project.members.push(result.data.name);
          this.project.id = this.projectID;
          this.projectService.updateProject(this.project);
        }
      }
     )
  }

  addMember($event) {
    this.project.members.push($event);
    this.project.id = this.projectID;
    this.projectService.updateProject(this.project);
    this.closeModal();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
