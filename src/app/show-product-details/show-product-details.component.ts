import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {
  private _productService = inject(ProductService);
  productDetails : Product[] = [];
  displayedColumns: string[] = ['productName', 'productDescription', 'price', 'discount'];

  ngOnInit(): void {
      this.getAllProducts();
  }

  public getAllProducts() {
    return this._productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.productDetails = response;
    }, (error : HttpErrorResponse) => {
      console.log(error);
    });
  }
}
