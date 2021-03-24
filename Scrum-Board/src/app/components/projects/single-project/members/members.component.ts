import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass']
})
export class MembersComponent implements OnInit {

  @Input()
  public members: [User];
  @Input()
  public roles: [string];

  constructor() { }

  ngOnInit(): void {
  }

  openEditModal(member) {

  }

  removeMember(id) {
    if (id) {

    }
  }

}
