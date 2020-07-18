import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() totalPages: number;

  @Input() currentPage: number;

  public get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  public get isLastPage(): boolean {
    return this.totalPages <= (this.currentPage + 1);
  }

  public get previousPage() {
    const page = this.isFirstPage ? this.currentPage : this.currentPage - 1;
    return ['/news', page];
  }

  public get nextPage() {
    const page = this.isLastPage ? this.currentPage : this.currentPage + 1;
    return ['/news', page];
  }

  constructor() { }

  ngOnInit(): void {
  }

}
