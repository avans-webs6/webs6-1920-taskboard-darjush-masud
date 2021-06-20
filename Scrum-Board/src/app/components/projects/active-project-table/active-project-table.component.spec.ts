import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectService } from 'src/app/services/project.service';
import { ProjectServiceStub } from 'src/app/stubs/projectservicestub';

import { ActiveProjectTableComponent } from './active-project-table.component';

describe('ActiveProjectTableComponent', () => {
  let component: ActiveProjectTableComponent;
  let fixture: ComponentFixture<ActiveProjectTableComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveProjectTableComponent ],
      imports: [RouterTestingModule],
      providers: [{ provide: ProjectService, useClass: ProjectServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: mockDialogRef }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
