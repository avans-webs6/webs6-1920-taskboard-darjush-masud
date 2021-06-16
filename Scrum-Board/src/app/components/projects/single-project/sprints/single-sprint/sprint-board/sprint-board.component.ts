import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { UserStory } from 'src/app/models/userstory';
import { UserStoryService } from 'src/app/services/userstory.service';

@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.sass']
})
export class SprintBoardComponent implements OnInit {
  @Input()
  public userStories = [UserStory];
  public todo = [];
  public in_progress = [];
  public review = [];
  public done = [];

  constructor(private userstoryService: UserStoryService) { }

  ngOnInit(): void {
    console.log(this.userStories);
    this.userStories.forEach(userstory => {
      //this.userstoryService.getUserStoryByID(userstory)
    });
  }

}
