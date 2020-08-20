import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprojectmodalComponent } from './editprojectmodal.component';

describe('EditprojectmodalComponent', () => {
  let component: EditprojectmodalComponent;
  let fixture: ComponentFixture<EditprojectmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprojectmodalComponent ]
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
