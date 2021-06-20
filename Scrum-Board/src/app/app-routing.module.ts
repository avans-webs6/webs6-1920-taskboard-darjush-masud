import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignUpComponent } from './components/authentication/sign-up/sign-up.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ProjectComponent } from './components/projects/single-project/project/project.component';
import { SingleSprintComponent } from './components/projects/single-project/sprints/single-sprint/single-sprint.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project/:id', component: ProjectComponent },
  { path: 'sprint/:id', component: SingleSprintComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
