import { Injectable, inject } from '@angular/core';
import { Product } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {
  private _sanitizer = inject(DomSanitizer);
  constructor() { }

  public createImagesFromProduct(product: Product) {
    const productImages : any[] = product.productImages;
    const productImagesToFileHandle: FileHandle[] = [];

    for(let i = 0; i < productImages.length; i++) {
      const imageFileData = productImages[i];
      const imageBlob = this.dataUriToBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type : imageFileData.type });
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };

      // Push to final array
      productImagesToFileHandle.push(finalFileHandle);
    }

    product.productImages = productImagesToFileHandle;
    return product;
  }

  public dataUriToBlob(picByte: any, imageType: any) {
    const byteString =  window.atob(picByte);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType});
    return blob;
  }
}