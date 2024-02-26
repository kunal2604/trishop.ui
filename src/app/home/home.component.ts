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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatGridListModule, MatButtonModule, NgFor, NgIf],
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
  showLoadButton:boolean = false;

  ngOnInit(): void {
   this.getAllProducts();
  }
  
  public getAllProducts() {
    this._productService.getAllProducts(this.pageNumber, this.pageSize)
    .pipe(
      map((x:Product[], i) => x.map((product: Product) => { 
        return this._imageProcessingService.createImagesFromProduct(product);
      }))
    )
    .subscribe(
      (resp:Product[]) => {
        resp.forEach(p => this.productDetails.push(p));
        if(resp.length == this.pageSize) {
          this.showLoadButton = true;
        }
        else {
          this.showLoadButton = false;
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
}
