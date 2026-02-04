import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,  } from '@angular/core';

@Component({
  selector: 'ms-pagination-component',
  imports: [CommonModule],
  templateUrl: './pagenation.html',
  styleUrl: './pagenation.css',
  standalone: true
})
export class Pagenation implements OnChanges  {
  
  @Input() itemlength: number = 0;
  @Output() pageChange = new EventEmitter<any>();

  @Input() currentPage: number = 1;
  @Input() itemsPerPage = 10;
  @Input() products: any[] = [];
  
  totalPages: number = 0;
  visiblePages: (number | string)[] = [];
  private readonly siblingsCount = 1; // Pages to show around current page

  @Input() currentPage!: number;
  itemsPerPage = 10;
  ngOnChanges(changes: SimpleChanges): void {
    this.changePage(this.currentPage)
  }
  
  changePage(page: number) {
    this.currentPage = page;
    this.visiblePages = this.getVisiblePages();

    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;

    this.pageChange.emit({ start: start, end: end, page: page });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }
}
