import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-editsprintmodal',
  templateUrl: './editsprintmodal.component.html',
  styleUrls: ['./editsprintmodal.component.sass']
})
export class EditsprintmodalComponent implements OnInit {

  public sprint: Sprint;
  public startdateControl;
  public enddateControl;
  public startdate;
  public enddate;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Sprint, public dialogRef: MatDialogRef<EditsprintmodalComponent>) {
    this.sprint = data;
    this.startdate = new Date(data.startdate);
    this.enddate = data.enddate;
    console.log(this.startdate);
    console.log(this.enddate);
    this.startdateControl = new FormControl(data.startdate);
    this.enddateControl = new FormControl(data.enddate);
  }

  ngOnInit(): void {
  }


  editUserSprint(){
    this.dialogRef.close({event: 'edit', data: this.sprint});
  }

}
