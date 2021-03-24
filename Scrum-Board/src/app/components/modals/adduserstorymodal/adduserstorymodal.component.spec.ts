import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserstorymodalComponent } from './adduserstorymodal.component';

describe('AdduserstorymodalComponent', () => {
  let component: AdduserstorymodalComponent;
  let fixture: ComponentFixture<AdduserstorymodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdduserstorymodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserstorymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
