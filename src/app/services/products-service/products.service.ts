import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { finalize, Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
}
export const ALL_CATEGORY = 'All';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly dataUrl = 'assets/mock-products.json';
  public products: Signal<Product[]>;
  public isLoading = signal(true);

  categories = computed(() => {
    const all = this.products();
    const uniq = Array.from(new Set(all.map((p) => p.category)));
    return [ALL_CATEGORY, ...uniq];
  });

  constructor(private http: HttpClient) {
    this.products = toSignal(this.getProducts(), {
      initialValue: [],
    });
  }

  private getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.dataUrl)
      .pipe(finalize(() => this.isLoading.set(false)));
  }
}
