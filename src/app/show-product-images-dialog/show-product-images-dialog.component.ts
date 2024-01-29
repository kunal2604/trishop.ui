import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-show-product-images-dialog',
  standalone: true,
  imports: [MatGridListModule, NgFor],
  templateUrl: './show-product-images-dialog.component.html',
  styleUrl: './show-product-images-dialog.component.css'
})
export class ShowProductImagesDialogComponent {
  public _dialogData: any = inject(MAT_DIALOG_DATA);
}
