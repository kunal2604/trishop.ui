import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderDetails } from '../../_model/order-details.model';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../_model/product.model';
import { ProductService } from '../../_services/product.service';
import { NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogueComponent } from '../../shared/components/dialog/notification-dialogue/notification-dialogue.component';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [ FormsModule, NgFor, MatFormFieldModule, MatInputModule, MatButtonModule ],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.css'
})
export class BuyProductComponent implements OnInit {
  private _activatedRoute = inject(ActivatedRoute);
  private _productService = inject(ProductService);
  private _dialogBox = inject(MatDialog);
  
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
        this.openNotificationForm('Order Placed', `Your order: ${this.orderDetails.orderName} was successfully placed!`);
        orderForm.reset();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getQuantityForProduct(productId: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity;
  }

  public getCalculatedTotal(productId: number, price: number, discount: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return Number(filteredProduct[0].quantity) * (price - discount);
  }

  public onQuantityChange(quantity: any, productId: number) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = Number(quantity);
  }

  public getCalculatedGrandTotal() {
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const filterResult = this.productDetails.filter(product => product.productId === productQuantity.productId)[0];
        const price = (filterResult.price - filterResult.discount) * Number(productQuantity.quantity);
        grandTotal += price;
      }
    );

    return grandTotal;
  }

  public openNotificationForm(title: string, message: string) {
    this._dialogBox.open(NotificationDialogueComponent, {
      data: {
        title: title,
        message: message
      },
      width: '30%'
    });
  }
}
