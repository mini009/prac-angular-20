import { TestBed } from '@angular/core/testing';

import { Investmentservcies } from './investmentservcies';

describe('Investmentservcies', () => {
  let service: Investmentservcies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Investmentservcies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
