import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddmembermodalComponent } from './addmembermodal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireModule } from '@angular/fire';

describe('AddmembermodalComponent', () => {
  let component: AddmembermodalComponent;
  let fixture: ComponentFixture<AddmembermodalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmembermodalComponent ],
      imports: [MatDialogModule, AngularFireModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmembermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
