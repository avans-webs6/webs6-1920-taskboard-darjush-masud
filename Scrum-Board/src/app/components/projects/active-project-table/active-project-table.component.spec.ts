import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActiveProjectTableComponent } from './active-project-table.component';

describe('ActiveProjectTableComponent', () => {
  let component: ActiveProjectTableComponent;
  let fixture: ComponentFixture<ActiveProjectTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveProjectTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProjectTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
