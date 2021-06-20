import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { CreatesprintmodalComponent } from './createsprintmodal.component';

describe('CreatesprintmodalComponent', () => {
  let component: CreatesprintmodalComponent;
  let fixture: ComponentFixture<CreatesprintmodalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatesprintmodalComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} },
      { provide: MatDialog, useValue: {} },
      { provide: MatDialogRef, useValue: mockDialogRef }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesprintmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
