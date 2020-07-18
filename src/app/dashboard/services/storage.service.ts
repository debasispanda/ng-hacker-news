import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  save(objectID: number, value: any) {
    return this.fetchAll().pipe(
      map(res => {
        const news = res.get(objectID);
        const data = news ? { ...news, ...value } : { ...value, objectID} ;
        res.set(objectID, data);
        localStorage.setItem('hacker-news', JSON.stringify([...res]));
        return res;
      })
    );
  }

  fetch(id) {
    return this.fetchAll().pipe(map(news => news.get(id)));
  }

  fetchAll(): Observable<Map<number, any>> {
    const data = JSON.parse(localStorage.getItem('hacker-news'));
    const response: Map<number, any> = data ? new Map(data) : new Map();
    return of(response);
  }
}
