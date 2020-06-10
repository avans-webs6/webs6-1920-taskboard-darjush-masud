import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  @Output()
  onClose = new EventEmitter();
  @Output()
  onCreate = new EventEmitter();
  public projectName:any;
  public projectDescription:any;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }

  cancel() { this.onClose.emit(null); }

  createProject(){
    let newProject = {
      name: this.projectName,
      description: this.projectDescription
    };
    this.onCreate.emit(newProject);
  }

}
