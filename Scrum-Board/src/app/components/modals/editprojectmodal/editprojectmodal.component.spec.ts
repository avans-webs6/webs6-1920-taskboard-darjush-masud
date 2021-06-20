import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditprojectmodalComponent } from './editprojectmodal.component';

describe('EditprojectmodalComponent', () => {
  let component: EditprojectmodalComponent;
  let fixture: ComponentFixture<EditprojectmodalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprojectmodalComponent ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprojectmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
