import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EditsprintmodalComponent } from 'src/app/components/modals/sprint/editsprintmodal/editsprintmodal.component';
import { SprintService } from 'src/app/services/sprint.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-active-sprint-table',
  templateUrl: './active-sprint-table.component.html',
  styleUrls: ['./active-sprint-table.component.sass']
})
export class ActiveSprintTableComponent implements OnInit {


  @Output()
  onArchive = new EventEmitter();

  public showModal: boolean = false;
 
  private unsubscribe$ = new Subject<void>();


  @Input()
  public activeSprints = [];

  public activeSprint: {};

  constructor(private router: Router, private sprintService: SprintService, public userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
 
  }

  openEditModal(activeSprint) {
    const editdialog = this.dialog.open(EditsprintmodalComponent, {
      data: activeSprint
    });

    editdialog.afterClosed().subscribe(result => {
      if (result.event == 'edit') {
        this.sprintService.updateSprint(result.data);
      }
    });
  }

  closeEditModal() {
    this.showModal = false;
  }

 

  archiveSprint(id: string) {
    this.onArchive.emit(id);
  }

  navigateToSprint(id) {
    this.router.navigate([`sprint/${id}`]);
  }

}

