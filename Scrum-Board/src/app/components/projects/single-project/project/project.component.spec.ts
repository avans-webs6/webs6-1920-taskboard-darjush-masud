import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from "@angular/router/testing";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { UserService } from 'src/app/services/user.service';
import { UserStoryService } from 'src/app/services/userstory.service';
import { AuthenticationServiceStub } from 'src/app/stubs/authenticationservicestub';
import { ProjectServiceStub } from 'src/app/stubs/projectservicestub';
import { SprintServiceStub } from 'src/app/stubs/sprintservicestub';
import { UserServiceStub } from 'src/app/stubs/userservicestub';
import { UserStoryServiceStub } from 'src/app/stubs/userstoryservicestub';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ],
      imports: [RouterTestingModule],
      providers: [{ provide: ProjectService, useClass: ProjectServiceStub },
        { provide: AuthenticationService, useClass: AuthenticationServiceStub },
        { provide: UserStoryService, useClass: UserStoryServiceStub },
        { provide: SprintService, useClass: SprintServiceStub },
        { provide: ProjectService, useClass: ProjectServiceStub },
        { provide: UserService, useClass: UserServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: mockDialogRef }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
