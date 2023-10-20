import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DummyJsonResponse, ProductsPaginator } from '../models/products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  private http = inject(HttpClient);

  public getProducts$(page: number = 1, itemsPerPage: number = 16): Observable<ProductsPaginator> {
    return this.http.get<DummyJsonResponse>('https://dummyjson.com/products', {
        params: {
          limit: itemsPerPage,
          skip: itemsPerPage * (page - 1),
        },
      })
      .pipe(
        map(
          (response) =>
            ({
              items: response.products,
              page: page,
              hasMorePages: response.skip + response.limit < response.total,
            } as ProductsPaginator)
        )
      );
  }
}
