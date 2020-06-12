import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.sass']
})
export class AddMemberModalComponent implements OnInit {

  constructor() {
  }
  @Input()
  public canBeAddedMembers;
  @Output()
  onClose = new EventEmitter();
  @Output()
  onCreate = new EventEmitter();


  public selectedMember;

  cancel() { this.onClose.emit(null); }
  ngOnInit(): void {
  }


  addMember() {
    this.onCreate.emit(this.selectedMember)
  }
}
