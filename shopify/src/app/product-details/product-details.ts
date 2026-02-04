import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';
import { HeaderComponent } from '../header/header';
import { Auth } from '../common/services/auth';
import { CartService } from '../common/services/cart.service';

@Component({
  selector: 'ms-product-details-component',
  imports: [CommonModule, CurrencypipePipe, HeaderComponent],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetailsComponent implements OnInit{
  product: any;
  loading = true;
  user: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: Auth, private cartService: CartService) {}

  ngOnInit() {
    this.getUserInfo();
    const id = this.route.snapshot.paramMap.get('productId');
    this.http.get(`https://dummyjson.com/products/${id}`)
      .subscribe((data) => {
        this.product = data;
        this.loading = false;
      });
  }

  getUserInfo() {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res;
    }, error => {
      this.user = {};
    })
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
