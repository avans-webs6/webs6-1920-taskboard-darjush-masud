import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArchivedProjectTableComponent } from './archived-project-table.component';

describe('ArchivedProjectTableComponent', () => {
  let component: ArchivedProjectTableComponent;
  let fixture: ComponentFixture<ArchivedProjectTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedProjectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedProjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
