import { TestBed } from '@angular/core/testing';

import { KeyboardInputService } from './keyboard-input.service';

describe('KeyboardInputService', () => {
  let service: KeyboardInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
