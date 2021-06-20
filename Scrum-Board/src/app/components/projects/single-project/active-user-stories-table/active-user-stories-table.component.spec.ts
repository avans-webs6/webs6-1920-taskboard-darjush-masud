import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { UserStoryService } from 'src/app/services/userstory.service';
import { UserStoryServiceStub } from 'src/app/stubs/userstoryservicestub';

import { ActiveUserStoriesTableComponent } from './active-user-stories-table.component';

describe('ActiveUserStoriesTableComponent', () => {
  let component: ActiveUserStoriesTableComponent;
  let fixture: ComponentFixture<ActiveUserStoriesTableComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUserStoriesTableComponent],
      providers: [{ provide: UserStoryService, useClass: UserStoryServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: mockDialogRef }],
     
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserStoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
