import { Injectable, effect } from '@angular/core';
import { signal, computed } from '@angular/core';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

const CART_STORAGE_KEY = 'shopify_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal to store cart items
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());

  // Computed signal for total price
  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  });

  // Computed signal for total items count
  totalItems = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + item.quantity, 0);
  });

  // Computed signal for total unique items
  totalUniqueItems = computed(() => {
    return this.cartItems().length;
  });

  constructor() {
    // Auto-save cart to localStorage whenever it changes
    effect(() => {
      this.saveCartToStorage(this.cartItems());
    });
  }

  // Load cart from localStorage
  private loadCartFromStorage(): CartItem[] {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return [];
    }
  }

  // Save cart to localStorage
  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  }

  // Get all cart items
  getCartItems() {
    return this.cartItems;
  }

  // Add item to cart
  addToCart(product: any): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If item exists, increase quantity - create a new array with updated item
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
      this.cartItems.set(updatedItems);
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail
      };
      this.cartItems.set([...currentItems, newItem]);
    }
  }

  // Remove item from cart
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems();
    const filtered = currentItems.filter(item => item.id !== productId);
    this.cartItems.set(filtered);
  }

  // Update quantity
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems();
    const itemIndex = currentItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      const updatedItems = [...currentItems];
      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        quantity: quantity
      };
      this.cartItems.set(updatedItems);
    }
  }

  // Clear cart
  clearCart(): void {
    this.cartItems.set([]);
  }

  // Get cart item count
  getItemCount(): number {
    return this.totalItems();
  }
}
