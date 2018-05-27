import { Component, OnInit, Input} from '@angular/core';
import { SearchTweet } from '../models/search_tweet.model';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.css']
})
export class TweetDetailComponent implements OnInit {
  @Input() tweets: SearchTweet[];
  constructor() { }

  ngOnInit() {
  }

}
