import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  public userName:String;
  public user;
  private service;
  constructor(public authService: AuthenticationService) { 
    this.service = this.authService;
  }
 




  async ngOnInit(): Promise<void> {
 
    console.log('sdfsdf')
    this.user = await this.service.userData;
    let email = this.user.email;
    let name = email.split("@");
    this.userName = name[0];
  
    


  }

}
