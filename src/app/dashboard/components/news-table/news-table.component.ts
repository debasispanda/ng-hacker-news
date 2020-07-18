import { Component, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnChanges {

  @Input() data: News[];

  @Output() hideNews: EventEmitter<number> = new EventEmitter();

  @Output() upvoteNews: EventEmitter<number> = new EventEmitter();

  public displayedColumns = ['num_comments', 'points', 'icon', 'title'];

  public dataSource: MatTableDataSource<News> = new MatTableDataSource();

  constructor() { }

  ngOnChanges({ data }: SimpleChanges) {
    if (data.currentValue && data.currentValue.length > 0) {
      this.dataSource.data = data.currentValue;
    }
  }

  public onHideNews(newsId) {
    this.hideNews.emit(newsId);
  }

  public onUpvoteNews(news) {
    this.upvoteNews.emit(news);
  }

}
