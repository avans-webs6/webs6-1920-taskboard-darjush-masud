import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmembermodalComponent } from './editmembermodal.component';

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


describe('EditmembermodalComponent', () => {
  let component: EditmembermodalComponent;
  let fixture: ComponentFixture<EditmembermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmembermodalComponent ],
      providers: [MAT_DIALOG_DATA]
    },
    
    )
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmembermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
