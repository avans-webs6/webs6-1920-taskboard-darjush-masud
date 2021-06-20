import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActiveSprintTableComponent } from './active-sprint-table.component';

describe('ActiveSprintTableComponent', () => {
  let component: ActiveSprintTableComponent;
  let fixture: ComponentFixture<ActiveSprintTableComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveSprintTableComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: SprintService, useClass: SprintServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSprintTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class SprintServiceStub {

}