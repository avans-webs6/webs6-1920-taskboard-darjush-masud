import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Sprint } from 'src/app/models/sprint';

import { EditsprintmodalComponent } from './editsprintmodal.component';

describe('EditsprintmodalComponent', () => {
  let component: EditsprintmodalComponent;
  let fixture: ComponentFixture<EditsprintmodalComponent>;

  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsprintmodalComponent ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsprintmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
