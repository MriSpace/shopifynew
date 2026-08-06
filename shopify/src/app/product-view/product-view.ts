import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CommonModule as CM } from '@angular/common';
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';
import { ProductsService } from '../common/services/products.service';
import { CartService } from '../common/services/cart.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Pagination } from '../pagenation/pagenation';

@Component({
  selector: 'ms-product-view-component',
  imports: [CM, RouterLink, CurrencypipePipe, Pagination ],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css',
  standalone: true
})
export class ProductView implements OnInit, OnChanges {
  @Input() products: any[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;
  filteredProducts: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.initializeFilteredProducts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products'] && !changes['products'].firstChange) {
      this.currentPage = 1;
      this.initializeFilteredProducts();
    }
  }

  initializeFilteredProducts(): void {
    if (this.products && Array.isArray(this.products) && this.products.length > 0) {
      this.filteredProducts = this.products.slice(0, this.itemsPerPage);
    }
  }

  onPageChange(pageProducts: any[]): void {
    console.log('Page changed:', pageProducts);
    if (Array.isArray(pageProducts) && pageProducts.length > 0) {
      this.filteredProducts = pageProducts;
    }
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log('Product added to cart:', product);
  }
}

