import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnChanges {

  @Input() totalPages: number;

  @Input() currentPage: number;

  @Input() data: News[];

  public displayedColumns = ['num_comments', 'points', 'icon', 'title'];

  public dataSource: MatTableDataSource<News> = new MatTableDataSource();

  public get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  public get isLastPage(): boolean {
    return this.totalPages <= (this.currentPage + 1);
  }

  constructor() { }

  ngOnChanges({ data }: SimpleChanges) {
    if (data.currentValue && data.currentValue.length > 0) {
      this.dataSource.data = data.currentValue;
    }
  }

}
