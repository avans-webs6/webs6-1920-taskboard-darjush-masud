import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ProjectComponent>) { 
  

  }

  ngOnInit(): void {
  }


  createSprint(){
    let sprint = {
      name: this.name,
      description: this.description,
      startdate: this.startdate,
      enddate: this.enddate,
  

    };
    this.dialogRef.close({event: 'create', data: sprint});

  }

}
