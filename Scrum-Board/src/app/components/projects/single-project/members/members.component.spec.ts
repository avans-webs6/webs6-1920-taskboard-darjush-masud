import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectServiceStub } from 'src/app/stubs/projectservicestub';

import { MembersComponent } from './members.component';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersComponent ],
      providers: [{ provide: ProjectService, useClass: ProjectServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: mockDialogRef }],
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
