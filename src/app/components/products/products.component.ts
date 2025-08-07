import { Component, inject } from '@angular/core';
import {
  ALL_CATEGORY,
  ProductsService,
} from '../../services/products-service/products.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductComponent } from '../product/product.component';
import { FilterPanelComponent } from '../filter-panel/filter-panel.component';
import { FilterService } from '../../services/filter-service/filter.service';
import { gridAnimation } from '../../animations/grid.animation';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-products',
  standalone: true,
  animations: [gridAnimation],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ProductComponent,
    FilterPanelComponent,
    MatProgressSpinnerModule,
    MatToolbarModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  protected productService = inject(ProductsService);
  private filterService = inject(FilterService);

  public products = this.productService.products;
  public filteredProducts = this.filterService.filteredProducts(this.products);

  clearFilters() {
    this.filterService.updateFilters({
      category: ALL_CATEGORY,
      minPrice: 0,
      maxPrice: 100,
    });
    this.filterService.updateKeyword('');
  }
}
