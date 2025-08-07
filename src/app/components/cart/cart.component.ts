import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {
  CartItem,
  CartService,
} from '../../services/cart-service/cart.service';
import { listAnimation } from '../../animations/list.animation';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  animations: [listAnimation],
  imports: [CommonModule, MatButtonModule, MatListModule, CartItemComponent],
})
export class CartComponent {
  readonly items!: Signal<CartItem[]>;
  readonly total!: Signal<number>;

  constructor(private cartService: CartService) {
    this.items = this.cartService.items;
    this.total = this.cartService.totalPrice;
  }

  clear(): void {
    this.cartService.clearCart();
  }
}
