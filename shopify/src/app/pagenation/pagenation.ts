import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges,  } from '@angular/core';

@Component({
  selector: 'ms-pagination-component',
  imports: [CommonModule],
  templateUrl: './pagenation.html',
  styleUrl: './pagenation.css',
  standalone: true
})
export class Pagination implements OnChanges  {
  
  @Input() itemlength: number = 0;
  @Input() products: any[] = [];
  @Output() pageChange = new EventEmitter<any[]>();

  @Input() currentPage: number = 1;
  @Input() itemsPerPage = 3;
  
  totalPages: number = 0;
  visiblePages: (number | string)[] = [];
  private readonly siblingsCount = 1;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateTotalPages();
    this.generateVisiblePages();
    this.changePage(this.currentPage);
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.itemlength / this.itemsPerPage);
  }

  generateVisiblePages(): void {
    const pages: (number | string)[] = [];
    const maxVisible = 5;
    
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, this.currentPage - this.siblingsCount);
      let endPage = Math.min(this.totalPages, this.currentPage + this.siblingsCount);

      if (this.currentPage <= this.siblingsCount + 1) {
        endPage = maxVisible - 1;
      } else if (this.currentPage >= this.totalPages - this.siblingsCount) {
        startPage = this.totalPages - maxVisible + 2;
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('...');
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < this.totalPages) {
        if (endPage < this.totalPages - 1) pages.push('...');
        pages.push(this.totalPages);
      }
    }

    this.visiblePages = pages;
  }
  
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    
    this.currentPage = page;
    this.generateVisiblePages();

    const start = (page - 1) * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, this.itemlength);

    const pageProducts = this.products.slice(start, end);
    this.pageChange.emit(pageProducts);
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
