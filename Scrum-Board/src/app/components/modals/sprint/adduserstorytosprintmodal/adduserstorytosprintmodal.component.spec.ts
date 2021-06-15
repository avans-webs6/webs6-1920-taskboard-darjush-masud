import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserstorytosprintmodalComponent } from './adduserstorytosprintmodal.component';

describe('AdduserstorytosprintmodalComponent', () => {
  let component: AdduserstorytosprintmodalComponent;
  let fixture: ComponentFixture<AdduserstorytosprintmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserstorytosprintmodalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserstorytosprintmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
