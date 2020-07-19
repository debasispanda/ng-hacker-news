import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, TestRequest, HttpTestingController } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { of } from 'rxjs';
import { StorageService } from './storage.service';

const RESPONSE = {
  hits: [
    { num_comments: 1, points: 1, story_text: 'test', objectID: 1 },
    { num_comments: 2, points: 2, story_text: 'test', objectID: 2 },
    { num_comments: 3, points: 3, story_text: 'test', objectID: 3 },
    { num_comments: 4, points: 4, story_text: 'test', objectID: 4 },
    { num_comments: 5, points: 5, story_text: 'test', objectID: 5 }
  ],
  hitsPerPage: 5,
  page: 0,
  nbPages: 10
};

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [NewsService]
    });
    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  function mockNews(res): TestRequest {
    const req = httpMock.expectOne('https://hn.algolia.com/api/v1/search?page=0');
    expect(req.request.method).toEqual('GET');
    req.flush(res);
    return req;
  }

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get news data from server', () => {
    service.getNews(0).subscribe(res => {
      expect(res.hits.length).toEqual(5);
      expect(res.page).toEqual(0);
      expect(res.nbPages).toEqual(10);
    });

    mockNews(RESPONSE);
  });

  it('should filter news hidden by user', () => {
    const mockData = new Map();
    mockData.set(1, { objectID: 1, hidden: true });
    const storageService = TestBed.inject(StorageService);
    spyOn(storageService, 'fetchAll').and.returnValue(of(mockData));
    service.getNews(0).subscribe(res => {
      expect(res.hits.length).toEqual(4);
    });

    mockNews(RESPONSE);
  });

  it('should update votes for each news', () => {
    const mockData = new Map();
    mockData.set(1, { objectID: 1, points: 10 });
    mockData.set(3, { objectID: 1, points: 20 });
    const storageService = TestBed.inject(StorageService);
    spyOn(storageService, 'fetchAll').and.returnValue(of(mockData));
    service.getNews(0).subscribe(res => {
      expect(res.hits.length).toEqual(5);
      expect(res.hits[0].points).toEqual(10);
      expect(res.hits[2].points).toEqual(20);
    });

    mockNews(RESPONSE);
  });
});
