import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../common/services/cart.service';
import { CurrencypipePipe } from '../pipes/currencypipe-pipe';
import { HeaderComponent } from '../header/header';
import { Auth } from '../common/services/auth';

@Component({
  selector: 'ms-cart-component',
  standalone: true,
  imports: [CommonModule, CurrencypipePipe, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class ShoppingCartComponent {
  user: any = {};

  constructor(public cartService: CartService, private auth: Auth) {
    this.getUserInfo();
  }

  getUserInfo(): void {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res;
    }, error => {
      this.user = {};
    })
  }
}