import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashtagSearchComponent } from './hashtag-search/hashtag-search.component';
import { UserSearchComponent } from './user-search/user-search.component';

const routes: Routes = [
  {path: '', redirectTo: '/hashtag_search', pathMatch: 'full'},
  { path: 'hashtag_search', component: HashtagSearchComponent },
  { path: 'user_search', component: UserSearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
