import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmembermodalComponent } from './addmembermodal.component';

describe('AddmembermodalComponent', () => {
  let component: AddmembermodalComponent;
  let fixture: ComponentFixture<AddmembermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmembermodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmembermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
