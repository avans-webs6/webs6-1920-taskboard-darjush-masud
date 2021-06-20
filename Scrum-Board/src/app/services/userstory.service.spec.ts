import { TestBed } from '@angular/core/testing';
import { UserStoryServiceStub } from '../stubs/userstoryservicestub';

import { UserStoryService } from './userstory.service';

describe('UserStoryService', () => {
  let service: UserStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserStoryService, useClass: UserStoryServiceStub }]
    });
    service = TestBed.inject(UserStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
