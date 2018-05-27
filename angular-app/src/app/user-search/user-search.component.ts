import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchTweetService } from '../services/search-tweet.service';
import { SearchTweet } from '../models/search_tweet.model';
import { PagerService } from '../services/pager.service'

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  pager: any = {};

  searchTweetSub: Subscription;
  searchTweets: SearchTweet[];
  searchWord: string;

  constructor(
    private searchTweetService: SearchTweetService,
    private pagerService: PagerService
  ) { }

  ngOnInit(): void {
    this.setPage(1);
  }
  onClickSearch(): void {
    if (this.searchWord) {
		  this.searchTweetService.getTweetsByUser(this.searchWord)
		    .subscribe(res => {
          this.searchTweets = res;
          console.log(res);
          this.setPage(1);
        },
                  );
    }
  }
  setPage(page: number): void {
    let pageSize: number
    if (this.searchTweets) {
      pageSize = this.searchTweets.length
    } else {
      pageSize = 0
    }
    this.pager = this.pagerService.getPager(page, pageSize);
  }
  goNextPage(): void {
    let max_id = this.searchTweets[this.searchTweets.length - 1].id
		this.searchTweetService.getTweetsByUser(this.searchWord, 'max_id', max_id)
		  .subscribe(res => {
        this.searchTweets = res;
        this.setPage(this.pager.nextPage);
      },
                );
  }
  goPreviousPage(): void {
    let since_id = this.searchTweets[0].id
		this.searchTweetService.getTweetsByUser(this.searchWord, 'since_id', since_id)
		  .subscribe(res => {
        this.searchTweets = res;
        this.setPage(this.pager.previousPage);
      },
                );
  }
}
