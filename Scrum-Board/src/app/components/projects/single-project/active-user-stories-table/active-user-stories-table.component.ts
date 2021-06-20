import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserService } from 'src/app/services/user.service';
import { EdituserstorymodalComponent } from 'src/app/components/modals/edituserstorymodal/edituserstorymodal.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-active-user-stories-table',
  templateUrl: './active-user-stories-table.component.html',
  styleUrls: ['./active-user-stories-table.component.sass']
})
export class ActiveUserStoriesTableComponent implements OnInit {


  @Output()
  onArchive = new EventEmitter();

  public showModal: boolean = false;
 
  private unsubscribe$ = new Subject<void>();

  @Input()
  public activeUserStories: [];
  constructor(private router: Router, private userStoryService: UserStoryService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  openEditModal(activeUserStory) {
    const editdialog = this.dialog.open(EdituserstorymodalComponent, {
      data: activeUserStory
    });

    editdialog.afterClosed().subscribe(result => {
      if (result.event == 'edit') {
        this.userStoryService.updateUserStory(result.data);
      }
    });
  }

  closeEditModal() {
    this.showModal = false;
  }

  editUserStory($event) {
  }

  archiveUserStory(id: string) {
    this.onArchive.emit(id);
  }

  navigateToUserStory(id) {
    this.router.navigate([`userstory/${id}`]);
  }

 





}
