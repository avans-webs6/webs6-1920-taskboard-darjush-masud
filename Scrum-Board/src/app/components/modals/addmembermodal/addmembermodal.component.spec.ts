import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddmembermodalComponent } from './addmembermodal.component';

describe('AddmembermodalComponent', () => {
  let component: AddmembermodalComponent;
  let fixture: ComponentFixture<AddmembermodalComponent>;

  beforeEach(waitForAsync(() => {
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
