import { Component, inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [ MatGridListModule, MatFormField, MatButton, MatIcon, MatDialogModule, MatInputModule, MatButtonModule ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  public _dialogData: any = inject(MAT_DIALOG_DATA);

  constructor(private _ref: MatDialogRef<ConfirmationDialogComponent>) {
  }

  public confirm() {
    this._ref.close("Yes");
  }
  public close() {
    this._ref.close("No");
  }
}
