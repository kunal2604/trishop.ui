import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { Observable, map, of } from 'rxjs';
import { inject } from '@angular/core';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

export const ProductResolver: ResolveFn<Product> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> => {
    const _productService = inject(ProductService);
    const _imageProcessingService = inject(ImageProcessingService);
    const id = route.paramMap.get("productId");

    if(id) {
      //fetch product with given id 
      var prodId = Number(id);
      return _productService.getProductDetailsById(Number(id))
      .pipe(
        map(p => _imageProcessingService.createImagesFromProduct(p))
      );
    }
    else {
      //return empty product observable 
      return of(getEmptyProductDetails());
    }
};

export const getEmptyProductDetails = () => {
  return {
    productId: 0,
    productName: "",
    productDescription: "",
    price: 0,
    discount:0,
    productImages: []
  };
};