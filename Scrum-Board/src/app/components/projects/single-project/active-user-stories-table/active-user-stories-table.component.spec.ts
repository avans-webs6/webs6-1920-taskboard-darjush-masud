import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUserStoriesTableComponent } from './active-user-stories-table.component';

describe('ActiveUserStoriesTableComponent', () => {
  let component: ActiveUserStoriesTableComponent;
  let fixture: ComponentFixture<ActiveUserStoriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveUserStoriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUserStoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
