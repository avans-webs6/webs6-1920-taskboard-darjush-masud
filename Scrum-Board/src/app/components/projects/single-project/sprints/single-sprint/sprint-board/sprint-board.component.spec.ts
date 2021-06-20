import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SprintService } from 'src/app/services/sprint.service';
import { UserStoryService } from 'src/app/services/userstory.service';

import { SprintBoardComponent } from './sprint-board.component';

describe('SprintBoardComponent', () => {
  let component: SprintBoardComponent;
  let fixture: ComponentFixture<SprintBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SprintBoardComponent ],
	  providers: [
		  { provide: SprintService, useClass: SprintServiceStub },
		  { provide: UserStoryService, useClass: UserStoryServiceStub }
	  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SprintBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class SprintServiceStub {

}

class UserStoryServiceStub {

}