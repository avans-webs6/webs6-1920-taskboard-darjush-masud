import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedUserStoriesTableComponent } from './archived-user-stories-table.component';

describe('ArchivedUserStoriesTableComponent', () => {
  let component: ArchivedUserStoriesTableComponent;
  let fixture: ComponentFixture<ArchivedUserStoriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedUserStoriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedUserStoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
