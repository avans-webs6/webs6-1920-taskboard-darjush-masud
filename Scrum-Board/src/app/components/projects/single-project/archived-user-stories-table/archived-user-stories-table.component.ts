import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserStory } from 'src/app/models/userstory';
import { UserService } from 'src/app/services/user.service';
import { UserStoryService } from 'src/app/services/userstory.service';

@Component({
  selector: 'app-archived-user-stories-table',
  templateUrl: './archived-user-stories-table.component.html',
  styleUrls: ['./archived-user-stories-table.component.sass']
})
export class ArchivedUserStoriesTableComponent implements OnInit {

  @Input()
  public archivedUserStories: [];

  @Output()
  onActivate = new EventEmitter();
  public showModal: boolean = false;

  

  constructor(private router: Router, private userStoryService: UserStoryService, public userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }


  closeEditModal() {
    this.showModal = false;
  }

  editUserStory($event) {

  }

  activateUserStory(id: string) {
    this.onActivate.emit(id);
  }

  navigateToUserStory(id){
    this.router.navigate([`userstory/${id}`]);
  }


}
