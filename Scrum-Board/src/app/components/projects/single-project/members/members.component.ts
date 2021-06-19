import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditmembermodalComponent } from 'src/app/components/modals/editmembermodal/editmembermodal.component';
import { Member } from 'src/app/models/member';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {

	@Input()
	public project: Project;
  @Input()
  public members: [Member];
  @Input()
  public memberNames: [string?];

  @Output()
  onArchive = new EventEmitter();

  public showModal: boolean = false;

  constructor(public projectService: ProjectService, public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openEditModal(id: string, role: string) {
	const editdialog = this.dialog.open(EditmembermodalComponent, {
		data: {userId: id, role: role}
	  });
  
	  editdialog.afterClosed().subscribe(result => {
		if (result.event == 'edit') {
			this.project.members.forEach(member => {
				if (member.userId == result.data.userId) {
					member.role = result.data.role;
				}
			});
			this.projectService.updateProject(this.project)
		}
	  });
  }

  closeEditModal() {
    this.showModal = false;
  }

}
