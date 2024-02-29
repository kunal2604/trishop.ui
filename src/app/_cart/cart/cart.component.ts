import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CartService } from '../../_services/cart.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _cartService = inject(CartService);
  cartDetails: any[] = [];
  displayedColumns: string[] = ['productName', 'description', 'price', 'discount', 'actions'];

  ngOnInit() {
    this.getCartDetails();
  }

  public getCartDetails() {
    this._cartService.getCartDetails().subscribe(
      (resp: any[]) => {
        console.log(resp);
        this.cartDetails = resp;
      },(err) => { 
        console.log(err);
      }
    );
  }
  public deleteProduct(productId: number) {
    console.log('Delete product from cart');  
  }
}
