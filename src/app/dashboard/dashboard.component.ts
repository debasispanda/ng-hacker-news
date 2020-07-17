import { Component, OnInit } from '@angular/core';
import { NewsService } from './services/news.service';
import { News } from './models/news';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public newsData: News[] = [];

  private subscriptions: Map<string, Subscription> = new Map();

  public currentPage = 0;

  public totalPages = 0;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.set('loadNews',
      this.route.params
        .pipe(
          map(param => param.id ? +param.id : 0),
          tap(page => this.currentPage = page),
          switchMap(page => this.newsService.getNews(page))
        )
        .subscribe((res: any) => {
          this.newsData = res.hits as News[];
        }));
  }

}
