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


@NgModule({
  declarations: [DashboardComponent, NewsTableComponent, NewsTimelineComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    DashboardRoutingModule
  ],
  providers: [NewsService]
})
export class DashboardModule { }
