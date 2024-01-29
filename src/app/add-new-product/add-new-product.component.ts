import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Product } from '../_model/product.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgFor } from '@angular/common';
import { DragDirective } from '../drag.directive';


@Component({
  selector: 'app-add-new-product',
  standalone: true,
  imports: [MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, MatGridListModule, NgFor, DragDirective],
  templateUrl: './add-new-product.component.html',
  styleUrl: './add-new-product.component.css'
})
export class AddNewProductComponent {
  private _productService = inject(ProductService);
  private _sanitizer = inject(DomSanitizer);

  product: Product = {
    productName: "",
    productDescription: "",
    price: 0,
    discount:0,
    productImages: []
  }

  public addProduct(addProductForm: NgForm) {
    const productformData = this.prepareFormData(this.product);
    this._productService.addNewProduct(productformData).subscribe(
      (response: Product) => {
        addProductForm.reset();
        this.product.productImages = [];
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product', 
      new Blob([JSON.stringify(product)], {type: 'Application/JSON'})
    );

    for(var i=0; i<product.productImages.length; i++) {
      formData.append('imageFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  public onFileSelected(event: any) {
    if(event.target.files) {
      const upoadedFiles = event.target.files;
      for(var i=0; i< upoadedFiles.length; i++) {
        const fileHandle: FileHandle = {
          file: upoadedFiles[i],
          url: this._sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(upoadedFiles[i])
          )
        }
        this.product.productImages.push(fileHandle);
      } 
    }
  }

  public fileDropped(fileHandle: any) {
    for(var i=0; i<fileHandle.length; i++) {
      this.product.productImages.push(fileHandle[i]);
    }
  }

  public removeImage(i : number) {
    this.product.productImages.splice(i,1);
  }

  public clearForm(addProductForm: NgForm) {
    addProductForm.reset();
  }
}