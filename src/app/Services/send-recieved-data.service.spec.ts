import { TestBed } from '@angular/core/testing';

import { SendRecievedDataService } from './send-recieved-data.service';

describe('SendRecievedDataService', () => {
  let service: SendRecievedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendRecievedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
