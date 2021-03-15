import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserstorymodalComponent } from './edituserstorymodal.component';

describe('EdituserstorymodalComponent', () => {
  let component: EdituserstorymodalComponent;
  let fixture: ComponentFixture<EdituserstorymodalComponent>;

  beforeEach(async(() => {
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
