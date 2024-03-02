import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Endpoints } from '../_constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private httpclient = inject(HttpClient);
  BASE_URL = 'http://localhost:9090';
  constructor() { }

  public getCartDetails() {
    const url = this.BASE_URL + Endpoints.GET_CART_DETAILS;
    return this.httpclient.get<any[]>(url);
  }

  public deleteProductFromCart(cartId: number) {
    const url = this.BASE_URL + Endpoints.DELETE_PRODCT_FROM_CART.replace("{cartId}", cartId.toString());
    return this.httpclient.delete(url);
  }
}
