import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editprojectmodal',
  templateUrl: './editprojectmodal.component.html',
  styleUrls: ['./editprojectmodal.component.sass']
})
export class EditprojectmodalComponent implements OnInit {

  @Output()
  onClose = new EventEmitter();
  @Output()
  onCreate = new EventEmitter();

  public project: Project;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Project, public dialogRef: MatDialogRef<EditprojectmodalComponent>) { 
    this.project =  data;
  }

  ngOnInit(): void {
  }


  editProject(){
    this.dialogRef.close({event: 'edit', data: this.project});
    
  }

}
