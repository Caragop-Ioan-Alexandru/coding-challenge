import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import {
  FilterService,
  SortOrder,
} from '../../services/filter-service/filter.service';
import { ProductsService } from '../../services/products-service/products.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss'],
})
export class FilterPanelComponent {
  protected filterService = inject(FilterService);
  protected sortOrder = SortOrder;
  private productsService = inject(ProductsService);

  filters = this.filterService.filters;
  categories = this.productsService.categories;

  onCategoryChange(category: string) {
    this.filterService.updateFilters({ category });
  }

  onMinPriceChange(minPrice: number) {
    this.filterService.updateFilters({ minPrice });
  }

  onMaxPriceChange(maxPrice: number) {
    this.filterService.updateFilters({ maxPrice });
  }

  onSortChange(order: SortOrder) {
    this.filterService.updateSort(order);
  }

  onKeywordChange(keyword: string) {
    this.filterService.updateKeyword(keyword);
  }
}
