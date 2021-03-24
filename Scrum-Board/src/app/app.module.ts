import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/authentication/verify-email/verify-email.component';
import { AuthenticationService } from './services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActiveProjectTableComponent } from './components/projects/active-project-table/active-project-table.component';
import { ArchivedProjectTableComponent } from './components/projects/archived-project-table/archived-project-table.component';
import { ProjectComponent } from './components/projects/single-project/project/project.component';
import { MembersComponent } from './components/projects/single-project/members/members.component';
import { EditprojectmodalComponent } from './components/modals/editprojectmodal/editprojectmodal.component';
import { CreateProjectModalComponent } from './components/modals/createprojectmodal/createprojectmodal.component';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AddmembermodalComponent } from './components/modals/addmembermodal/addmembermodal.component';
import { ActiveUserStoriesTableComponent } from './components/projects/single-project/active-user-stories-table/active-user-stories-table.component';
import { ArchivedUserStoriesTableComponent } from './components/projects/single-project/archived-user-stories-table/archived-user-stories-table.component';
import { CreateuserstorymodalComponent } from './components/modals/createuserstorymodal/createuserstorymodal.component';
import { EdituserstorymodalComponent } from './components/modals/edituserstorymodal/edituserstorymodal.component';
import { AdduserstorymodalComponent } from './components/modals/adduserstorymodal/adduserstorymodal.component';



@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    VerifyEmailComponent,
    ActiveProjectTableComponent,
    ArchivedProjectTableComponent,
    ProjectComponent,
    MembersComponent,
    EditprojectmodalComponent,
    CreateProjectModalComponent,
    AddmembermodalComponent,
    ActiveUserStoriesTableComponent,
    ArchivedUserStoriesTableComponent,
    CreateuserstorymodalComponent,
    EdituserstorymodalComponent,
    AdduserstorymodalComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
