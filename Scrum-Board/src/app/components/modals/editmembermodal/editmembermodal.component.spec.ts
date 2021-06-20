import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmembermodalComponent } from './editmembermodal.component';

import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';


describe('EditmembermodalComponent', () => {
  let component: EditmembermodalComponent;
  let fixture: ComponentFixture<EditmembermodalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmembermodalComponent ],
      providers: [   { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: MatDialog, useValue: {}},
        { provide: MatDialogRef, useValue: mockDialogRef },]
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
