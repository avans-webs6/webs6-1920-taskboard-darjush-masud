import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AdduserstorymodalComponent } from './adduserstorymodal.component';

describe('AdduserstorymodalComponent', () => {
  let component: AdduserstorymodalComponent;
  let fixture: ComponentFixture<AdduserstorymodalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserstorymodalComponent ],
      providers: [ { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserstorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
