import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-editmembermodal',
  templateUrl: './editmembermodal.component.html',
  styleUrls: ['./editmembermodal.component.sass']
})
export class EditmembermodalComponent implements OnInit {

	@Output()
	onClose = new EventEmitter();
	
	@Output()
	onCreate = new EventEmitter();

	public member: Member;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Member, public dialogRef: MatDialogRef<EditmembermodalComponent>) { 
	  this.member = data;
  }

  ngOnInit(): void {
  }

  editMember(){
    this.dialogRef.close({event: 'edit', data: this.member});
  }

}
