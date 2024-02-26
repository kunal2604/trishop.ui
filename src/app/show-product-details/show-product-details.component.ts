import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../shared/components/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {
  private _productService = inject(ProductService);
  private _imagesDialog = inject(MatDialog);
  private _imageProcessingService = inject(ImageProcessingService);
  private _dialogBox = inject(MatDialog);
  private _router = inject(Router);

  pageNumber: number = 0;
  productDetails : Product[] = [];
  displayedColumns: string[] = ['productName', 'description', 'price', 'discount', 'actions'];

  ngOnInit(): void {
      this.getAllProducts();
  }

  public getAllProducts() {
    return this._productService.getAllProducts(this.pageNumber, 5)
    .pipe(
      map( (x: Product[], i) => x.map((product: Product) => this._imageProcessingService.createImagesFromProduct(product)) )
    )
    .subscribe(
      (response: Product[]) => {
        response.forEach(p => this.productDetails.push(p));
    }, (error : HttpErrorResponse) => {
      console.log(error);
    });
  }

  public deleteProduct(productId: number) {
    this.openConfirmationPopup('Confirmation', 'Are you sure you want to delete?', () => {
      return this._productService.deleteProduct(productId).subscribe(
        (response) => {
          this.getAllProducts();
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    });
  }

  public showImages(product: Product) {
    this._imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '400px',
      width: '600px'
    });
  }

  public updateProductDetails(productId: number) {
    // second parameter is a path parameter
    this._router.navigate(['/addNewProduct', {productId: productId}]);  
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
}
