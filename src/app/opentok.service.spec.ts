/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpentokService } from './opentok.service';

describe('Service: Opentok', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpentokService]
    });
  });

  it('should ...', inject([OpentokService], (service: OpentokService) => {
    expect(service).toBeTruthy();
  }));
});
