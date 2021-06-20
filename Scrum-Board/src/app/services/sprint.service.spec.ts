import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { SprintService } from './sprint.service';

describe('SprintService', () => {
  let service: SprintService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AngularFirestore]
    });
    service = TestBed.inject(SprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
