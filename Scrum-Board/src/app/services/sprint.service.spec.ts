import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { SprintServiceStub } from '../stubs/sprintservicestub';

import { SprintService } from './sprint.service';

describe('SprintService', () => {
  let service: SprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: SprintService, useClass: SprintServiceStub }]
    });
    service = TestBed.inject(SprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
