import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../products-service/products.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _items = signal<CartItem[]>(this.loadFromStorage());

  readonly items = computed(() => this._items());
  readonly totalPrice = computed(() =>
    this._items().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  );

  constructor() {
    effect(() => {
      const items = this._items();
      localStorage.setItem('cart', JSON.stringify(items));
    });
  }

  addToCart(product: Product): void {
    const existing = this._items().find(
      (item) => item.product.id === product.id
    );
    if (existing) {
      this._items.update((items) =>
        items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this._items.update((items) => [...items, { product, quantity: 1 }]);
    }
  }

  updateQuantity(id: number, delta: number) {
    this._items.update((list) =>
      list.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  removeFromCart(productId: number): void {
    this._items.update((items) =>
      items.filter((item) => item.product.id !== productId)
    );
  }

  clearCart(): void {
    this._items.set([]);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const data = localStorage.getItem('cart');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }
}
