import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogueComponent } from '../shared/components/dialog/notification-dialogue/notification-dialogue.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ FormsModule, MatFormField, MatInputModule, MatButtonModule ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  private _userService = inject(UserService);
  private _dialogBox = inject(MatDialog);
  private _router = inject(Router);
  
  registerUser(registerUserForm: any) {
    console.log(registerUserForm.value);
    this._userService.registerUser(registerUserForm).subscribe(
      (response:any) => {
        console.log(response);
        registerUserForm.reset();
        let newUserAddedFullName = response.userLastName !== null && response.userLastName !== "" ? 
          response.userFirstName + response.userLastName : response.userFirstName;
        this.openNotificationForm('User added successfully', 
          `User: ${newUserAddedFullName} was successfully added!`, true, () => { 
            this._router.navigate(['/login']);
          });
      },
      (error:any) => {
        console.log(error);
        let failedUserFullName = registerUserForm.value.userLastName !== null && registerUserForm.value.userLastName !== "" ? 
        registerUserForm.value.userFirstName + registerUserForm.value.userLastName : registerUserForm.value.userFirstName;
        this.openNotificationForm('Error', 
          `User: ${failedUserFullName} could not be added. Please try again!`, false);
      }
    );
  }

  public openNotificationForm2(title: string, message: string) {
    this._dialogBox.open(NotificationDialogueComponent, {
      data: {
        title: title,
        message: message
      },
      width: '30%'
    });
  }

  public openNotificationForm(title: string, message: string, userAddedSuccessfully: boolean, callback?: Function) {
    var _usersuccessPopup = this._dialogBox.open(NotificationDialogueComponent, {
      width: '500px',
      data: {
        title: title,
        message: message
      },
      enterAnimationDuration: '400ms',
      exitAnimationDuration: '40ms'
    });
    _usersuccessPopup.afterClosed().subscribe((confirmationValue: string) => {
      if(userAddedSuccessfully && callback !== undefined) {
        callback();
      }
    });
  }
}