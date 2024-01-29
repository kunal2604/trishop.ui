import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-show-product-details',
  standalone: true,
  imports: [MatTableModule, MatIconModule],
  templateUrl: './show-product-details.component.html',
  styleUrl: './show-product-details.component.css'
})
export class ShowProductDetailsComponent implements OnInit {
  private _productService = inject(ProductService);
  productDetails : Product[] = [];
  displayedColumns: string[] = ['productName', 'productDescription', 'price', 'discount', 'edit', 'delete'];

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

  public deleteProduct(element: any) {
    return this._productService.deleteProduct(element.productId).subscribe(
      (response) => {
        console.log(response);
        this.getAllProducts();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }
}
