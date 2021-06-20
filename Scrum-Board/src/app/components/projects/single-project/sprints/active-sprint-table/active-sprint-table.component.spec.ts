import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SprintService } from 'src/app/services/sprint.service';
import { MatDialog } from '@angular/material/dialog';

import { ActiveSprintTableComponent } from './active-sprint-table.component';

describe('ActiveSprintTableComponent', () => {
  let component: ActiveSprintTableComponent;
  let fixture: ComponentFixture<ActiveSprintTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSprintTableComponent ],
	  imports: [ RouterTestingModule, MatDialog ],
	  providers: [
		  { provide: SprintService, useClass: SprintServiceStub }
	  ]
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

class SprintServiceStub {

}