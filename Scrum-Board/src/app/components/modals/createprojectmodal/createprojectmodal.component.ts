import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-createprojectmodal',
  templateUrl: './createprojectmodal.component.html',
  styleUrls: ['./createprojectmodal.component.sass']
})
export class CreateProjectModalComponent implements OnInit {

  @Output()
  onClose = new EventEmitter();
  @Output()
  onCreate = new EventEmitter();
  public projectName:any;
  public projectDescription:any;
  constructor(private projectService: ProjectService, public dialogRef: MatDialogRef<CreateProjectModalComponent>) { }

  ngOnInit(): void {
  }

  cancel() { this.onClose.emit(null); }

  createProject() {
    let newProject = {
      name: this.projectName,
      description: this.projectDescription,
    };
    this.dialogRef.close({event: 'create', data: newProject});

  }

}
