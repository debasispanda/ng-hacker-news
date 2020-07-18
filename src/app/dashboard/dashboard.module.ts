import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NewsTableComponent } from './components/news-table/news-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewsService } from './services';
import { NewsTimelineComponent } from './components/news-timeline/news-timeline.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { TimeSincePipe } from './pipes/time-since.pipe';
import { UrlHostnamePipe } from './pipes/url-hostname.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    DashboardComponent,
    NewsTableComponent,
    NewsTimelineComponent,
    NewsDetailComponent,
    TimeSincePipe,
    UrlHostnamePipe,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    DashboardRoutingModule
  ],
  providers: [NewsService]
})
export class DashboardModule { }
