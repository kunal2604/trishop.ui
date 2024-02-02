import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatDialogModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {
  private _productService = inject(ProductService);
  private _imagesDialog = inject(MatDialog);
  private _imageProcessingService = inject(ImageProcessingService);
  private _router = inject(Router);

  productDetails : Product[] = [];
  displayedColumns: string[] = ['productName', 'description', 'price', 'discount', 'actions'];

  ngOnInit(): void {
      this.getAllProducts();
  }

  public getAllProducts() {
    return this._productService.getAllProducts()
    .pipe(
      map( (x: Product[], i) => x.map((product: Product) => this._imageProcessingService.createImagesFromProduct(product)) )
    )
    .subscribe(
      (response: Product[]) => {
        this.productDetails = response;
    }, (error : HttpErrorResponse) => {
      console.log(error);
    });
  }

  public deleteProduct(productId: number) {
    return this._productService.deleteProduct(productId).subscribe(
      (response) => {
        this.getAllProducts();
    }, (error: HttpErrorResponse) => {
      console.log(error);
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
}
