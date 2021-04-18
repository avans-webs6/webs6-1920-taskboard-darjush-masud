import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSprintTableComponent } from './active-sprint-table.component';

describe('ActiveSprintTableComponent', () => {
  let component: ActiveSprintTableComponent;
  let fixture: ComponentFixture<ActiveSprintTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSprintTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSprintTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
