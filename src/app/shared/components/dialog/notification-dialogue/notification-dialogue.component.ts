import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-notification-dialogue',
  standalone: true,
  imports: [ MatGridListModule, MatFormField, MatButton, MatIcon, MatDialogModule, MatInputModule, MatButtonModule,
    NgFor ],
  templateUrl: './notification-dialogue.component.html',
  styleUrl: './notification-dialogue.component.css'
})
export class NotificationDialogueComponent {
  //public _dialogData: any = inject(MAT_DIALOG_DATA); // Used inside constructor
  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: {title:string, message: string}, private _ref: MatDialogRef<NotificationDialogueComponent>) {  
  }

  public onClickOk() {
    console.log('Closing notification popup!');
    this._ref.close();
  }
}
