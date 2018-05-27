import { TestBed, inject } from '@angular/core/testing';

import { SearchTweetService } from './search-tweet.service';

describe('SearchTweetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchTweetService]
    });
  });

  it('should be created', inject([SearchTweetService], (service: SearchTweetService) => {
    expect(service).toBeTruthy();
  }));
});
