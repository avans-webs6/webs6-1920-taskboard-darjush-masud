import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsprintmodalComponent } from './editsprintmodal.component';

describe('EditsprintmodalComponent', () => {
  let component: EditsprintmodalComponent;
  let fixture: ComponentFixture<EditsprintmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsprintmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsprintmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
