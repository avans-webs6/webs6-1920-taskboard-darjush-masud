import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/models/project';
import { Member } from 'src/app/models/member';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProjectService } from 'src/app/services/project.service';
import { AuthenticationServiceStub } from 'src/app/stubs/authenticationservicestub';
import { ProjectServiceStub } from 'src/app/stubs/projectservicestub';

import { DashboardComponent } from './dashboard.component';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: ProjectService;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  const expectedData: [Project] = [
    {
      name: 'memberstest'
      , description: "new", archived: false, owner: "kRDvZXh5xMTRrJBdm0XTdip4omE3", id: "MNQC6vBljSTmIScZ31Cn", status: "was", ownerName: "redhood"
    },

  ];
  let angularFireDatabaseStub = { list: () => { } };
  let mockProject$ = of(expectedData);
  beforeEach(waitForAsync(() => {
    //spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockProject$);
    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [AngularFireModule],
      providers: [{ provide: AuthenticationService, useClass: AuthenticationServiceStub },
      { provide: ProjectService, useClass: ProjectServiceStub },
      { provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialog, useValue: {} },
      { provide: MatDialogRef, useValue: mockDialogRef },
    {provide: AngularFireDatabase, useValue: angularFireDatabaseStub}]
    })
      .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    service = TestBed.inject(ProjectService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('get second project and check name', inject([ProjectService], (service: ProjectService) => {
    let project$ = service.getActiveProjects();
    let name = "";
    let archived = false;
    project$.subscribe(projects => {
      name = projects[1].name;
      archived = projects[1].archived;
    });
    expect(name).toEqual("big project");
    expect(archived).toEqual(false);
  }));






  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
