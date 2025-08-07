import { Component, inject, Input } from '@angular/core';
import {
  CartItem,
  CartService,
} from '../../services/cart-service/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { quantityChange } from '../../animations/quantityChange';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  animations: [quantityChange],
  imports: [
    CommonModule,
    CurrencyPipe,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Input() lastItem!: boolean;
  private cartService = inject(CartService);

  increment(productId: number) {
    this.cartService.updateQuantity(productId, +1);
  }

  decrement(productId: number) {
    this.cartService.updateQuantity(productId, -1);
  }

  removeItem(id: number): void {
    this.cartService.removeFromCart(id);
  }
}
