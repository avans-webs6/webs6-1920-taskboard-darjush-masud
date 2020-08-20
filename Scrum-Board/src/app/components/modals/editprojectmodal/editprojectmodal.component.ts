import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Project } from 'src/app/models/project';

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
  constructor() { 
    this.project = new Project();
  }

  ngOnInit(): void {
  }

  cancel() { this.onClose.emit(null); }

  editProject(){

    this.onCreate.emit(this.project);
  }

}
