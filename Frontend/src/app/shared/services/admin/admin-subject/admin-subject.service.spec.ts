import { TestBed } from '@angular/core/testing';

import { AdminSubjectService } from './admin-subject.service';

describe('AdminSubjectService', () => {
  let service: AdminSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
