import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient) { }

  public getNews(page: number = 0) {
    const URL = `https://hn.algolia.com/api/v1/search?page=${page}`;
    return this.http.get(URL);
  }
}
