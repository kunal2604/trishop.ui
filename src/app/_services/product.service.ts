import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../_model/product.model';
import { Endpoints } from '../_constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpclient = inject(HttpClient);
  BASE_URL = 'http://localhost:9090';
  constructor() { }

  public addNewProduct(product: FormData) {
    const url = this.BASE_URL + Endpoints.ADD_PRODUCT;
    return this.httpclient.post<Product>(url, product);
  }
}