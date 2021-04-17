import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateuserstorymodalComponent } from './createuserstorymodal.component';

describe('CreateuserstorymodalComponent', () => {
  let component: CreateuserstorymodalComponent;
  let fixture: ComponentFixture<CreateuserstorymodalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateuserstorymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateuserstorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
