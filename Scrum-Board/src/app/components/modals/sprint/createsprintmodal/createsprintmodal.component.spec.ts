import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesprintmodalComponent } from './createsprintmodal.component';

describe('CreatesprintmodalComponent', () => {
  let component: CreatesprintmodalComponent;
  let fixture: ComponentFixture<CreatesprintmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesprintmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatesprintmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
