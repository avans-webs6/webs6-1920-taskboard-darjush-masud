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
  public startdateControl = new FormControl('');
  public enddateControl = new FormControl('');
  public startdate;
  public enddate;
  public start;
  public end;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Sprint, public dialogRef: MatDialogRef<EditsprintmodalComponent>) {
    this.sprint = data;
    this.startdate = this.toDateTime(data.startdate['seconds']);
    this.enddate =  this.toDateTime(data.enddate['seconds']);
  }

  ngOnInit(): void {
  }

   toDateTime(secs) {
    let t = new Date(1970, 0, 2); // Epoch
    t.setSeconds(secs);
    return t.toLocaleDateString('en-GB');
}


  editUserSprint(){
    let newSprint = {
      id: this.sprint.id,
      name: this.sprint.name,
      description: this.sprint.description,
      archived: this.sprint.archived,
      projectId: this.sprint.projectId,
      startdate: this.startdateControl.value,
      enddate: this.enddateControl.value
    }
    let starttimer = this.startdateControl.value.getTime() / 1000;
    let endtimer = this.enddateControl.value.getTime() / 1000;
    if(starttimer > endtimer){
      alert('The startdate cannot be later than enddate');
      return;
    }
    this.dialogRef.close({event: 'edit', data: newSprint});
  }

}
