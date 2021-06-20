import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { ArchivedUserStoriesTableComponent } from './archived-user-stories-table.component';

describe('ArchivedUserStoriesTableComponent', () => {
  let component: ArchivedUserStoriesTableComponent;
  let fixture: ComponentFixture<ArchivedUserStoriesTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedUserStoriesTableComponent ],
      imports: [RouterTestingModule],
      providers: []
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
