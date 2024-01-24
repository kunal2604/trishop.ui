import { Component, inject } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  message:any;
  private userService = inject(UserService);

  ngOnInit():void {
    this.forUser();
  }
  forUser() {
    this.userService.forUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
