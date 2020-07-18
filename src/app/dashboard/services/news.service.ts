import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class NewsService {

  constructor(private http: HttpClient, private store: StorageService) { }

  public getNews(page: number = 0) {
    const URL = `https://hn.algolia.com/api/v1/search?page=${page}`;
    return this.http.get(URL).pipe(
      switchMap((res: any) => {
        return this.store.fetchAll().pipe(map(news => {
          const ids = Array.from(news.values()).filter(d => d.hidden).map(d => d.objectID);
          const hits = res.hits.filter(item => !ids.includes(item.objectID));
          return { ...res, hits };
        }));
      })
    );
  }

  public hideNews(objectID: number) {
    return this.store.save(objectID, { hidden: true }).pipe(map(items => Array.from(items.values())));
  }
}
