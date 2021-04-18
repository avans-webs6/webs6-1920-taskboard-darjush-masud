import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SprintService } from 'src/app/services/sprint.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-archived-sprints-table',
  templateUrl: './archived-sprints-table.component.html',
  styleUrls: ['./archived-sprints-table.component.sass']
})
export class ArchivedSprintsTableComponent implements OnInit {


  @Output()
  onActivate = new EventEmitter();

  public showModal: boolean = false;
 
  private unsubscribe$ = new Subject<void>();


  @Input()
  public archivedSprints: [];

  constructor(private router: Router, private sprintService: SprintService, public userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

 



 

  activateSprint(id: string) {
    this.onActivate.emit(id);
  }

 

}
