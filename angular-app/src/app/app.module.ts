import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SearchTweetService } from './services/search-tweet.service'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HashtagSearchComponent } from './hashtag-search/hashtag-search.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { FormsModule } from '@angular/forms';
import { PagerService } from './services/pager.service';
import { TweetDetailComponent } from './tweet-detail/tweet-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HashtagSearchComponent,
    UserSearchComponent,
    TweetDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    SearchTweetService,
    PagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
