import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sprint } from 'src/app/models/sprint';

@Component({
  selector: 'app-editsprintmodal',
  templateUrl: './editsprintmodal.component.html',
  styleUrls: ['./editsprintmodal.component.sass']
})
export class EditsprintmodalComponent implements OnInit {

  public sprint: Sprint;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Sprint, public dialogRef: MatDialogRef<EditsprintmodalComponent>) {
    this.sprint = data;
  }

  ngOnInit(): void {
  }


  editUserSprint(){
    this.dialogRef.close({event: 'edit', data: this.sprint});
  }

}
