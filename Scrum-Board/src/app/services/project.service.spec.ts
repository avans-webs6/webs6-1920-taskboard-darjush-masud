import { TestBed } from '@angular/core/testing';
import { ProjectServiceStub } from '../stubs/projectservicestub';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ProjectService, useClass: ProjectServiceStub }]
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
