import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CartService } from '../../_services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../shared/components/dialog/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationDialogueComponent } from '../../shared/components/dialog/notification-dialogue/notification-dialogue.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _cartService = inject(CartService);
  private _router = inject(Router);
  private _dialogBox = inject(MatDialog);
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
  public deleteProductFromCart(cartId: number) {
    this.openConfirmationPopup('Confirmation', 'Are you sure you want to delete?', () => {
      return this._cartService.deleteProductFromCart(cartId).subscribe(
        (response) => {
          this.openNotificationForm('Cart updated!','Item was removed from cart!');
          this.getCartDetails();
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.openNotificationForm('Error!','There was an error!');
      });
    });
  }

  public checkout() {
    this._router.navigate(['/buyProduct', {
      isSingleProductCheckout: false,
      id: 0
    }]);
  }

  public openConfirmationPopup(title: string, message: string, callback: Function) {
    var _confirmationPopup = this._dialogBox.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: title,
        message: message
      },
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '40ms'
    });
    _confirmationPopup.afterClosed().subscribe((confirmationValue: string) => {
      if(confirmationValue == "Yes") {
        callback();
      }
    })
  }

  public openNotificationForm(title: string, message: string) {
    var _notificationPopup = this._dialogBox.open(NotificationDialogueComponent, {
      data: {
        title: title,
        message: message
      },
      width: '30%'
    });
  }
}
