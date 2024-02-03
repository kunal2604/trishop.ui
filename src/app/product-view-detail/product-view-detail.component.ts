import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../_model/product.model';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-product-view-detail',
  standalone: true,
  imports: [ NgFor, MatButtonModule, MatGridListModule ],
  templateUrl: './product-view-detail.component.html',
  styleUrl: './product-view-detail.component.css'
})
export class ProductViewDetailComponent implements OnInit {
  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    price: 0,
    discount:0,
    productImages: []
  };

  private _activatedRoute = inject(ActivatedRoute);
  selectedProductImageIndex: number = 0;

  ngOnInit(): void {
    this.product = this._activatedRoute.snapshot.data['product'];
	console.log(this.product);
  }

  public changeImageIndex(index: number) {
	this.selectedProductImageIndex = index;
  }

}
