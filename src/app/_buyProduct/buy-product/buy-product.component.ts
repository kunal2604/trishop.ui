import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderDetails } from '../../_model/order-details.model';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../_model/product.model';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [ FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);

  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    orderName: '',
    orderAddress: '',
    orderContact: '',
    orderAlternateContact: '',
    orderProductQuantityList: []
  }

  ngOnInit(): void {
    this.productDetails = this._activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        { productId: x.productId, quantity: 1 }
      )
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this._productService.placeOrder(this.orderDetails).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset()
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
