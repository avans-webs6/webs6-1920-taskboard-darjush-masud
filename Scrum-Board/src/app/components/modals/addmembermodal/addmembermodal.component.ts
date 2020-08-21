import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectComponent } from '../../projects/single-project/project/project.component';

@Component({
  selector: 'app-addmembermodal',
  templateUrl: './addmembermodal.component.html',
  styleUrls: ['./addmembermodal.component.sass']
})
export class AddmembermodalComponent implements OnInit {
  canBeAddedMembers: any;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProjectComponent>) { 
    this.canBeAddedMembers = data;
  }
  public selectedMember;

  ngOnInit(): void {
  }


  addMember(){
    let newMember = {
      name: this.selectedMember
    };
    this.dialogRef.close({event: 'create', data: newMember});

  }

}
