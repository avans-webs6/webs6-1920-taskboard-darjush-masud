import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { UserService } from 'src/app/services/user.service';
import { UserStoryService } from 'src/app/services/userstory.service';
import { ProjectServiceStub } from 'src/app/stubs/projectservicestub';
import { SprintServiceStub } from 'src/app/stubs/sprintservicestub';
import { UserServiceStub } from 'src/app/stubs/userservicestub';
import { UserStoryServiceStub } from 'src/app/stubs/userstoryservicestub';

import { SingleSprintComponent } from './single-sprint.component';

describe('SingleSprintComponent', () => {
  let component: SingleSprintComponent;
  let fixture: ComponentFixture<SingleSprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSprintComponent ],
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useClass: UserServiceStub },
        { provide: ProjectService, useClass: ProjectServiceStub },
        { provide: UserStoryService, useClass: UserStoryServiceStub },
        { provide: SprintService, useClass: SprintServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
