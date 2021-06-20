import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SprintService } from 'src/app/services/sprint.service';
import { SprintServiceStub } from 'src/app/stubs/sprintservicestub';

import { ArchivedSprintsTableComponent } from './archived-sprints-table.component';

describe('ArchivedSprintsTableComponent', () => {
  let component: ArchivedSprintsTableComponent;
  let fixture: ComponentFixture<ArchivedSprintsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedSprintsTableComponent ],
      imports: [RouterTestingModule],
      providers: [{ provide: SprintService, useClass: SprintServiceStub }]
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
