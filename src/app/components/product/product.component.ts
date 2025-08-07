import { Component, Input } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardActions,
  MatCardTitle,
  MatCardFooter,
} from '@angular/material/card';
import { Product } from '../../services/products-service/products.service';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart-service/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardContent,
    MatCardActions,
    CurrencyPipe,
    MatCardTitle,
    MatCardFooter,
    MatButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  onAdd(product: Product): void {
    this.cartService.addToCart(product);
  }
}
