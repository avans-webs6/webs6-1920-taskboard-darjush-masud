import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleSprintComponent } from 'src/app/components/projects/single-project/sprints/single-sprint/single-sprint.component';

@Component({
  selector: 'app-adduserstorytosprintmodal',
  templateUrl: './adduserstorytosprintmodal.component.html',
  styleUrls: ['./adduserstorytosprintmodal.component.sass']
})
export class AdduserstorytosprintmodalComponent implements OnInit {
  canBeAddedUserstories: any;
  public selectedUserstory;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<SingleSprintComponent>) {
    this.canBeAddedUserstories = data;
  }

  ngOnInit(): void {
  }


  addUserstory(){
    let newUserstory = {
      name: this.selectedUserstory
    };
    this.dialogRef.close({event: 'create', data: newUserstory});

  }

}
