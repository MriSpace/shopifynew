import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { Subject, forkJoin } from 'rxjs';
import { Auth } from '../common/services/auth';
import { Router } from '@angular/router';
import { ProductView } from '../product-view/product-view';
import { ProductsService } from '../common/services/products.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ms-home-component',
  imports: [HeaderComponent,ProductView ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
  user: any = {}
  name: string = 'test'
  products: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private auth: Auth, public route: Router, private productsService: ProductsService) {}

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData(): void {
    this.loading = true;
    forkJoin({
      user: this.auth.getUser(),
      products: this.productsService.getProducts()
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (result: any) => {
          console.log('API responses:', result);
          
          // Handle user data
          this.user = result.user || {};
          this.name = result.user?.firstName || 'test';
          
          // Handle products data
          this.products = result.products?.products || [];
          
          this.loading = false;
          this.error = null;
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.error = 'Failed to load data';
          this.loading = false;
          this.user = {};
          this.route.navigate(['/login']);
        }
      );
  }
}
