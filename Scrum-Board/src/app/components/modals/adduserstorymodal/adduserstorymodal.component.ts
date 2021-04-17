import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectComponent } from '../../projects/single-project/project/project.component';

@Component({
  selector: 'app-adduserstorymodal',
  templateUrl: './adduserstorymodal.component.html',
  styleUrls: ['./adduserstorymodal.component.sass']
})
export class AdduserstorymodalComponent implements OnInit {

  canBeAddedMembers: any;
  public selectedMember;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProjectComponent>) { 
    this.canBeAddedMembers = data;

  }
  public name;
  public description;
  public status;
  public storypoints;

  ngOnInit(): void {
  }


  createUserStory(){
    let userStory = {
      name: this.name,
      description: this.description,
      status: this.status,
      storypoints: this.storypoints,
      owner: this.selectedMember.id,
      ownerName: this.selectedMember.name

    };
    this.dialogRef.close({event: 'create', data: userStory});

  }

}
