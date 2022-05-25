import { Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BookResponse } from '../book-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookApiService {
  constructor(private http: HttpClient) {}

  public searchBooks(
    title: string,
    lang: string,
    startIndex: number = 0,
    maxRecords: number = 10
  ): Observable<BookResponse> {
    // Tried to encode the input but it didn`t work.
    // title = encodeURI(title) - nie
    // title = title.replace(" ", "%20")

    return this.http.get<BookResponse>(
      `${environment.bookApiUrl}/books/v1/volumes`,
      {
        params: {
          q: `intitle:${title}`,
          langRestrict: lang,
          startIndex: startIndex,
          maxResults: maxRecords,
        },
        headers: {
          Accept: 'application/json',
        },
      }
    );
  }
}
