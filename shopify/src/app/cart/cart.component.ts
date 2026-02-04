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
  template: `
    <ms-header-component [user]="user"></ms-header-component>
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      
      <div *ngIf="cartService.getCartItems()().length === 0" class="empty-cart">
        <p>Your cart is empty</p>
      </div>

      <div *ngIf="cartService.getCartItems()().length > 0" class="cart-content">
        <div class="cart-items">
          <div *ngFor="let item of cartService.getCartItems()()" class="cart-item">
            <img [src]="item.thumbnail" [alt]="item.title" class="item-image">
            <div class="item-details">
              <h4>{{ item.title }}</h4>
              <p class="item-price">{{ item.price | currencypipe }}</p>
            </div>
            
            <div class="quantity-control">
              <button (click)="cartService.updateQuantity(item.id, item.quantity - 1)" class="qty-btn">-</button>
              <span class="qty-display">{{ item.quantity }}</span>
              <button (click)="cartService.updateQuantity(item.id, item.quantity + 1)" class="qty-btn">+</button>
            </div>

            <div class="item-total">
              {{ (item.price * item.quantity) | currencypipe }}
            </div>

            <button (click)="cartService.removeFromCart(item.id)" class="remove-btn">Remove</button>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>{{ cartService.totalPrice() | currencypipe }}</span>
          </div>
          <div class="summary-row">
            <span>Tax (10%):</span>
            <span>{{ (cartService.totalPrice() * 0.1) | currencypipe }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>{{ (cartService.totalPrice() * 1.1) | currencypipe }}</span>
          </div>
          <button class="checkout-btn">Proceed to Checkout</button>
          <button (click)="cartService.clearCart()" class="clear-btn">Clear Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
    }

    h2 {
      margin-bottom: 2rem;
      color: #333;
    }

    .empty-cart {
      text-align: center;
      padding: 3rem;
      color: #999;
    }

    .cart-content {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 2rem;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 80px 1fr 150px 100px 100px;
      gap: 1rem;
      align-items: center;
      padding: 1rem;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background-color: #f9f9f9;
    }

    .item-image {
      width: 80px;
      height: 80px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details h4 {
      margin: 0;
      font-size: 0.95rem;
      color: #333;
    }

    .item-price {
      margin: 0.5rem 0 0 0;
      color: #007bff;
      font-weight: bold;
    }

    .quantity-control {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0.3rem;
    }

    .qty-btn {
      background: none;
      border: none;
      cursor: pointer;
      width: 25px;
      padding: 0.2rem;
      font-weight: bold;
      color: #007bff;
    }

    .qty-btn:hover {
      background-color: #f0f0f0;
    }

    .qty-display {
      min-width: 30px;
      text-align: center;
    }

    .item-total {
      font-weight: bold;
      color: #333;
    }

    .remove-btn {
      background-color: #ff6b6b;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .remove-btn:hover {
      background-color: #ff5252;
    }

    .cart-summary {
      background-color: #f9f9f9;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      height: fit-content;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      padding: 0.8rem 0;
      border-bottom: 1px solid #e0e0e0;
    }

    .summary-row.total {
      border-bottom: none;
      font-size: 1.2rem;
      font-weight: bold;
      color: #007bff;
      padding: 1rem 0 0 0;
      margin-top: 0.5rem;
    }

    .checkout-btn {
      width: 100%;
      padding: 1rem;
      margin-top: 1rem;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }

    .checkout-btn:hover {
      background-color: #218838;
    }

    .clear-btn {
      width: 100%;
      padding: 0.8rem;
      margin-top: 0.5rem;
      background-color: #e0e0e0;
      color: #333;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .clear-btn:hover {
      background-color: #d0d0d0;
    }

    @media (max-width: 768px) {
      .cart-content {
        grid-template-columns: 1fr;
      }

      .cart-item {
        grid-template-columns: 60px 1fr;
        gap: 0.5rem;
      }

      .quantity-control,
      .item-total,
      .remove-btn {
        grid-column: 2;
      }
    }
  `]
})
export class ShoppingCartComponent {
  user: any = {};

  constructor(public cartService: CartService, private auth: Auth) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.auth.getUser().subscribe((res: any) => {
      this.user = res;
    }, error => {
      this.user = {};
    })
  }
}