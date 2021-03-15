import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserStory } from 'src/app/models/userstory';

@Component({
  selector: 'app-edituserstorymodal',
  templateUrl: './edituserstorymodal.component.html',
  styleUrls: ['./edituserstorymodal.component.sass']
})
export class EdituserstorymodalComponent implements OnInit {

  @Output()
  onClose = new EventEmitter();
  @Output()
  onCreate = new EventEmitter();

  public userstory: UserStory;
  constructor(@Inject(MAT_DIALOG_DATA) public data: UserStory, public dialogRef: MatDialogRef<EdituserstorymodalComponent>) {
    this.userstory = data;
  }

  ngOnInit(): void {
  }


  editProject(){
    this.dialogRef.close({event: 'edit', data: this.userstory});
  }

}
