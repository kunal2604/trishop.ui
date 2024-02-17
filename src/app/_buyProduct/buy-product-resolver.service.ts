import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Product } from "../_model/product.model";
import { Observable, map } from "rxjs";
import { inject } from "@angular/core";
import { ProductService } from "../_services/product.service";
import { ImageProcessingService } from "../_services/image-processing.service";

export const BuyProductResolverService: ResolveFn<Product[]> = 
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> => {
    const _productService = inject(ProductService);
    const _imageProcessingService = inject(ImageProcessingService);
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return _productService.getProductDetails(Boolean(isSingleProductCheckout), Number(id))
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => _imageProcessingService.createImagesFromProduct(product))
      )
    );
};
