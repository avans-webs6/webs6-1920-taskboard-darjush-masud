import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass']
})
export class ProjectComponent implements OnInit {
  public project: Project;
  public projectMembers = []
  public canBeAddedMembers: any[]
  public showModal: boolean = false;
  private unsubscribe$ = new Subject<void>();
  private projectID:string;


  constructor(private router: ActivatedRoute, private projectService: ProjectService,
    public authService: AuthenticationService, private userService: UserService) { }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.projectID = this.router.snapshot.paramMap.get('id');
    let thisClass = this;
    this.projectService.getProjectByID(this.projectID).then(resp => {
      thisClass.project = resp;
      resp.members.forEach(member => {
        thisClass.userService.getUserByID(member).then(resp => {
          thisClass.projectMembers.push(resp.name);
        });
      });
    });

    this.userService.getNotYetJoinedMembers(this.projectMembers).pipe(takeUntil(this.unsubscribe$)).subscribe(resp => {
      let outputMembers = []
      let members = []
      outputMembers = resp;
      for (let i of outputMembers)
        i && members.push(i); // copy each non-empty value to the 'temp' array
      outputMembers = members;
      this.canBeAddedMembers = outputMembers;
    });
  }




  closeModal() {
    this.showModal = false;
  }

  openModal() {
    this.showModal = true;

  }

  addMember($event) {
    this.project.members.push($event);
    this.project.id = this.projectID;
    this.projectService.updateProject(this.project);
    this.closeModal();
  }


}
