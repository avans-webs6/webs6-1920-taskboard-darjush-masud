import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectComponent } from 'src/app/components/projects/single-project/project/project.component';

@Component({
  selector: 'app-createsprintmodal',
  templateUrl: './createsprintmodal.component.html',
  styleUrls: ['./createsprintmodal.component.sass']
})
export class CreatesprintmodalComponent implements OnInit {

  public name;
  public description;
  public startdate;
  public enddate;
  public picker;
  public startdateControl = new FormControl('');
  public enddateControl = new FormControl('');

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProjectComponent>) {


  }

  ngOnInit(): void {
  }


  createSprint() {
    let sprint = {
      name: this.name,
      description: this.description,
      startdate: this.startdateControl.value,
      enddate: this.enddateControl.value,


    };

    let starttimer = this.startdateControl.value.getTime() / 1000;
    let endtimer = this.enddateControl.value.getTime() / 1000;
    if (starttimer > endtimer) {
      alert('The startdate cannot be later than enddate');
      return;
    }


    this.dialogRef.close({ event: 'create', data: sprint });
  }

}
