import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../shared/components/dialog/contact-us/contact-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule ,MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
  ,  providers: [ {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {title: 'Notification'}} ]
})
export class HomeComponent implements OnInit {
  private _productService = inject(ProductService);
  private _imageProcessingService = inject(ImageProcessingService);
  private _router = inject(Router);
  private _dialogBox = inject(MatDialog);
  productDetails: Product[] = [];

  ngOnInit(): void {
   this.getAllProducts();
  }
  
  public getAllProducts() {
    this._productService.getAllProducts()
    .pipe(
      map((x:Product[], i) => x.map((product: Product) => { 
        return this._imageProcessingService.createImagesFromProduct(product);

      }))
    )
    .subscribe(
      (resp:any) => {
        this.productDetails = resp; 
      }
    );
  }

  showProductDetails(productId: number) {
    this._router.navigate(['/productViewDetails', { productId: productId }]);
  }

  public openContactUsForm() {
    this._dialogBox.open(ContactUsComponent, {
      width: '500px',
      data: {name: 'Chaman'}
    });
  }
}
