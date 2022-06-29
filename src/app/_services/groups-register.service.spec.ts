import { TestBed } from '@angular/core/testing';

import { GroupsRegisterService } from './groups-register.service';

describe('GroupsRegisterService', () => {
  let service: GroupsRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupsRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
