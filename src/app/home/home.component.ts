import { Component, OnInit, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from '../shared/components/dialog/contact-us/contact-us.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, MatFormField, MatInputModule, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private _productService = inject(ProductService);
  private _imageProcessingService = inject(ImageProcessingService);
  private _router = inject(Router);
  private _dialogBox = inject(MatDialog);
  productDetails: Product[] = [];
  pageNumber: number = 0;
  pageSize: number = 4;
  showLoadMoreButton:boolean = false;

  ngOnInit(): void {
   this.getAllProducts();
  }
  
  public getAllProducts(searchKey: string = "") {
    this._productService.getAllProducts(this.pageNumber, this.pageSize, searchKey)
    .pipe(
      map((x:Product[], i) => x.map((product: Product) => { 
        return this._imageProcessingService.createImagesFromProduct(product);
      }))
    )
    .subscribe(
      (resp:Product[]) => {
        resp.forEach(p => this.productDetails.push(p));
        if(resp.length == this.pageSize) {
          this.showLoadMoreButton = true;
        }
        else {
          this.showLoadMoreButton = false;
        }
      }
    );
  }

  showProductDetails(productId: number) {
    this._router.navigate(['/productViewDetails', { productId: productId }]);
  }

  public openContactUsForm() {
    var _contactPopup = this._dialogBox.open(ContactUsComponent, {
      width: '500px',
      data: {name: 'Trishop User'},
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '40ms'
    });
    _contactPopup.afterClosed().subscribe((item) => {
      console.log(item);
    });
  }

  public loadMoreProducts() {
    this.pageNumber++;
    this.getAllProducts();
  }

  public searchByKeyword(searchKey: string) {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKey);
  }
}
