import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { News } from '../../models/news';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.scss']
})
export class NewsTableComponent implements OnChanges {

  @Input() data: News[];

  public displayedColumns = ['num_comments', 'points', 'icon', 'title'];

  public dataSource: MatTableDataSource<News> = new MatTableDataSource();

  constructor() { }

  ngOnChanges({ data }: SimpleChanges) {
    if (data.currentValue && data.currentValue.length > 0) {
      this.dataSource.data = data.currentValue;
    }
  }

}
