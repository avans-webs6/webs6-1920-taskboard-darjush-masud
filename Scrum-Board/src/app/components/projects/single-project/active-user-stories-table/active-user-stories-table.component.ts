import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserStory } from 'src/app/models/userstory';
import { Router } from '@angular/router';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserService } from 'src/app/services/user.service';
import { EdituserstorymodalComponent } from 'src/app/components/modals/edituserstorymodal/edituserstorymodal.component';

@Component({
  selector: 'app-active-user-stories-table',
  templateUrl: './active-user-stories-table.component.html',
  styleUrls: ['./active-user-stories-table.component.sass']
})
export class ActiveUserStoriesTableComponent implements OnInit {
  @Input()
  public activeUserStories: [UserStory];

  @Output()
  onArchive = new EventEmitter();

  public showModal: boolean = false;

  constructor(private router: Router, private userStoryService: UserStoryService, public userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  openEditModal(activeUserStory) {
   const editdialog =  this.dialog.open(EdituserstorymodalComponent, {
      data: activeUserStory
    });

    editdialog.afterClosed().subscribe(result => {
      if(result.event == 'edit'){
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

  navigateToUserStory(id){
    this.router.navigate([`userstory/${id}`]);
  }

}