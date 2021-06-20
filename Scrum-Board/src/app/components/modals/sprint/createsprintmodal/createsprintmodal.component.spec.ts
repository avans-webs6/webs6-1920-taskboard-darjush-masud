import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CreatesprintmodalComponent } from './createsprintmodal.component';

describe('CreatesprintmodalComponent', () => {
  let component: CreatesprintmodalComponent;
  let fixture: ComponentFixture<CreatesprintmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesprintmodalComponent ],
      providers: [MAT_DIALOG_DATA]
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
