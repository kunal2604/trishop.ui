import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userService = inject(UserService);
  private userAuthService = inject(UserAuthService);
  private router = inject(Router);

  constructor() {}
  ngOnInit(): void {}
  
  login(loginForm: any) {
    console.log("Form is submitted.");
    this.userService.login(loginForm).subscribe(
      (response:any) => {
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.user.role);

        const role = response.user.role[0].roleName;
        if(role === 'Admin') {
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/user']);
        }
      },
      (error:any) => {
        console.log(error);
      }
    );
  }
}
