import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { NgIf } from '@angular/common';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public userService = inject(UserService);
  private userAuthService = inject(UserAuthService);
  private router = inject(Router);

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clearLocalStorage();
    this.router.navigate(['/home']);
  }
}
