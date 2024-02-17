import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Product } from '../_model/product.model';
import { Endpoints } from '../_constants/endpoints';
import { OrderDetails } from '../_model/order-details.model';

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

  public getAllProducts() {
    const url = this.BASE_URL + Endpoints.GET_ALL_PRODUCTS;
    return this.httpclient.get<Product[]>(url);
  }

  public deleteProduct(productId: number) {
    const url = this.BASE_URL + Endpoints.DELETE_PRODUCT_DETAILS.replace("{productId}", productId.toString());
    return this.httpclient.delete(url);
  }

  public getProductDetailsById(productId: number) {
    const url = this.BASE_URL + Endpoints.GET_PRODUCT_DETAILS_BY_ID.replace("{productId}", productId.toString());
    return this.httpclient.get<Product>(url);
  }

  public getProductDetails(isSingleProductCheckout: boolean, productId: number) {
    const url = this.BASE_URL + Endpoints.GET_PRODUCT_DETAILS.replace("{isSingleProductCheckout}", isSingleProductCheckout.toString()).replace("{productId}", productId.toString());
    return this.httpclient.get<Product[]>(url);
  }

  public placeOrder(orderDetails: OrderDetails) {
    const url = this.BASE_URL + Endpoints.PLACE_ORDER;
    return this.httpclient.post(url, orderDetails);
  }
}