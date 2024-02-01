import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule ,MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _productService = inject(ProductService);
  private _imageProcessingService = inject(ImageProcessingService);
  productDetails: Product[] = [];

  ngOnInit(): void {
   this.getAllProducts();
  }
  
  public getAllProducts() {
    console.log("as");
    this._productService.getAllProducts()
    .pipe(
      map((x:Product[], i) => x.map((product: Product) => { 
        return this._imageProcessingService.createImagesFromProduct(product);

      }))
    )
    .subscribe(
      (resp:any) => {
        console.log(resp);
      }
    );
  }
}
