import {
  Injectable,
  signal,
  computed,
  WritableSignal,
  Signal,
  inject,
  effect,
  untracked,
} from '@angular/core';
import {
  ALL_CATEGORY,
  Product,
  ProductsService,
} from '../products-service/products.service';

export interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  sort: SortOrder;
  keyword: string;
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

@Injectable({ providedIn: 'root' })
export class FilterService {
  private producstService = inject(ProductsService);

  public filters: WritableSignal<Filters> = signal<Filters>({
    category: ALL_CATEGORY,
    minPrice: 0,
    maxPrice: 100,
    sort: SortOrder.Ascending,
    keyword: '',
  });

  public maxPrice = computed(() => {
    const products = this.producstService.products();
    if (products.length === 0) return 0;
    const max = Math.max(...products.map((p) => p.price));
    return max;
  });

  readonly _init = effect(
    () => {
      const max = this.maxPrice();
      const currentFilterMax = untracked(() => this.filters().maxPrice);

      if (max > 0 && currentFilterMax !== max) {
        this.filters.set({
          ...this.filters(),
          maxPrice: max,
        });
      }
    },
    { allowSignalWrites: true }
  );

  public filteredProducts(
    allProducts: Signal<Product[]> | Product[]
  ): Signal<Product[]> {
    const productsSignal: Signal<Product[]> =
      typeof allProducts === 'function'
        ? (allProducts as Signal<Product[]>)
        : signal(allProducts as Product[]);

    return computed<Product[]>(() => {
      const f = this.filters();
      return productsSignal()
        .filter(
          (p) =>
            (f.category === ALL_CATEGORY || p.category === f.category) &&
            p.price >= f.minPrice &&
            p.price <= f.maxPrice &&
            p.title.toLowerCase().includes(f.keyword.toLowerCase())
        )
        .sort((a, b) =>
          f.sort === SortOrder.Ascending ? a.price - b.price : b.price - a.price
        );
    });
  }

  public updateSort(order: SortOrder): void {
    this.filters.update((f) => ({ ...f, sort: order }));
  }

  public updateFilters(
    newFilters: Partial<Omit<Filters, 'sort' | 'keyword'>>
  ): void {
    this.filters.update((current) => ({ ...current, ...newFilters }));
  }

  public updateKeyword(keyword: string): void {
    this.filters.update((current) => ({ ...current, keyword }));
  }
}
