import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/models/project';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditprojectmodalComponent } from '../../modals/editprojectmodal/editprojectmodal.component';

@Component({
  selector: 'app-active-project-table',
  templateUrl: './active-project-table.component.html',
  styleUrls: ['./active-project-table.component.sass']
})
export class ActiveProjectTableComponent implements OnInit {
  @Input()
  public activeProjects: [Project];

  @Output()
  onArchive = new EventEmitter();

  public showModal: boolean = false;

  constructor(private router: Router,private projectService: ProjectService, public userService: UserService,public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  openEditModal(activeProject) {
   const editdialog =  this.dialog.open(EditprojectmodalComponent, {
      data: activeProject
    });

    editdialog.afterClosed().subscribe(result => {
      if(result.event == 'edit'){
        this.projectService.updateProject(result.data);
      }
    });
  }

  closeEditModal() {
    this.showModal = false;
  }

  editProject($event){
    

  }


  archiveProject(id: string){
    this.onArchive.emit(id);
  }

  navigateToProject(id){
    this.router.navigate([`project/${id}`]);
  }

}
