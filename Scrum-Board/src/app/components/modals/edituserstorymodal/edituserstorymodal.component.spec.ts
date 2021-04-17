import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EdituserstorymodalComponent } from './edituserstorymodal.component';

describe('EdituserstorymodalComponent', () => {
  let component: EdituserstorymodalComponent;
  let fixture: ComponentFixture<EdituserstorymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EdituserstorymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdituserstorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
