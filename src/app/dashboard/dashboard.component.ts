import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from './services/news.service';
import { News } from './models/news';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public newsData: News[] = [];

  private subscriptions: Map<string, Subscription> = new Map();

  public currentPage = 0;

  public totalPages = 0;

  public loading = false;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.set('loadNews',
      this.route.params
        .pipe(
          map(({ page }) => page ? +page : 0),
          tap(page => {
            this.loading = true;
            this.currentPage = page;
          }),
          switchMap(page => this.newsService.getNews(page))
        )
        .subscribe(
          (res: any) => {
            this.newsData = res.hits as News[];
            this.totalPages = res.nbPages;
            this.loading = false;
          },
          error => {
            console.error(error);
            this.loading = false;
          }
        ));
  }

  public onHideNews(newsId) {
    this.subscriptions.set('hideNews', this.newsService.hideNews(newsId).subscribe(res => {
      const hiddenIds = res.filter(item => item.hidden).map(item => item.objectID);
      this.newsData = this.newsData.filter(item => !hiddenIds.includes(item.objectID));
    }));
  }

  public onUpvoteNews(news) {
    const { objectID, points } = news;
    this.subscriptions.set('upvoteNews', this.newsService.upvoteNews(objectID, points + 1).subscribe(res => {
      this.newsData = this.newsData.map(item => {
        const newPoints = res.get(item.objectID)?.points;
        return newPoints ? { ...item, points: newPoints } : item;
      });
    }));
  }

  ngOnDestroy() {
    if (this.subscriptions.size > 0) {
      for (const key of Array.from(this.subscriptions.keys())) {
        this.subscriptions.get(key).unsubscribe();
      }
    }
  }

}
