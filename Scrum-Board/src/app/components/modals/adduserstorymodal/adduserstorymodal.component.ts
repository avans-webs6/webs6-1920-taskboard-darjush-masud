import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserStoryStatus } from 'src/app/enumerations/userstorystatus';
import { ProjectComponent } from '../../projects/single-project/project/project.component';

@Component({
  selector: 'app-adduserstorymodal',
  templateUrl: './adduserstorymodal.component.html',
  styleUrls: ['./adduserstorymodal.component.sass']
})
export class AdduserstorymodalComponent implements OnInit {

  canBeAddedMembers: any;
  public selectedMember;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProjectComponent>) {
    this.canBeAddedMembers = data;

  }
  public name;
  public description;
  public storypoints;

  ngOnInit(): void {
  }


  createUserStory() {


    if (this.name == undefined || this.description == undefined || this.storypoints == undefined || this.selectedMember == undefined ) {
      alert("some fields are empty, please fill the fields!");
      return;
    } else {

      let userStory = {
        name: this.name,
        description: this.description,
        status: UserStoryStatus.backlog,
        storypoints: this.storypoints,
        donedate: null,
        owner: this.selectedMember.id,
        ownerName: this.selectedMember.name

      };

      this.dialogRef.close({ event: 'create', data: userStory });
    }


  }

}
