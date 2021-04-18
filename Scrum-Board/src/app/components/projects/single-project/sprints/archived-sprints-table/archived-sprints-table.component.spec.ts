import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedSprintsTableComponent } from './archived-sprints-table.component';

describe('ArchivedSprintsTableComponent', () => {
  let component: ArchivedSprintsTableComponent;
  let fixture: ComponentFixture<ArchivedSprintsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedSprintsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedSprintsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
