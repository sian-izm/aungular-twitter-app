import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { API_URL, LIMIT_PER_PAGE } from '../env';
import { SearchTweet } from '../models/search_tweet.model';

@Injectable({
  providedIn: 'root'
})
export class SearchTweetService {
  constructor(private http: HttpClient) { }
  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  getTweetsByHashtag(term: string, boundlyParam?: string, id?: number): Observable<SearchTweet[]> {
    let url = `${API_URL}/hashtags/${term}?page_limit=${LIMIT_PER_PAGE + 1}`
    // boundlyParam: max_id or since_id
    if (boundlyParam) {
      url += `&${boundlyParam}=${id}`
    }
    return this.http.get<SearchTweet[]>(url)
      .pipe(
        catchError(this.handleError('getTweetsByHastag', []))
      );
  }

  getTweetsByUser(term: string, boundlyParam?: string, id?: number): Observable<SearchTweet[]> {
    let url = `${API_URL}/users/${term}?page_limit=${LIMIT_PER_PAGE + 1}`
    // boundlyParam: max_id or since_id
    if (boundlyParam) {
      url += `&${boundlyParam}=${id}`
    }
    return this.http.get<SearchTweet[]>(url)
      .pipe(
        catchError(this.handleError('getTweetsByUser', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    return of(result as T);
  };
}
}
