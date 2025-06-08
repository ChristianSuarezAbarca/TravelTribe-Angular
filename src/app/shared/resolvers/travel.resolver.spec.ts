import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { travelResolver } from './travel.resolver';

describe('travelResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => travelResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
