import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId) { }

  save(objectID: number, value: any) {
    return this.fetchAll().pipe(
      map(res => {
        const news = res.get(objectID);
        const data = news ? { ...news, ...value } : { ...value, objectID };
        res.set(objectID, data);

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('hacker-news', JSON.stringify([...res]));
        }

        return res;
      })
    );
  }

  fetch(id) {
    return this.fetchAll().pipe(map(news => news.get(id)));
  }

  fetchAll(): Observable<Map<number, any>> {
    let data;
    if (isPlatformBrowser(this.platformId)) {
      data = JSON.parse(localStorage.getItem('hacker-news'));
    }
    const response: Map<number, any> = data ? new Map(data) : new Map();
    return of(response);
  }
}
