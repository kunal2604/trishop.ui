import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { inject } from '@angular/core';
import { UserService } from '../_services/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);
  
  if(userAuthService.isLoggedIn()) {
    const role = route.data['roles'] as Array<string>;
    
    if(role) {
      const match = userService.roleMatch(role);
      if(match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    } else {
      router.navigate(['/forbidden']);
      return false;
    }
  } 
  else {
    router.navigate(['/login']);  // During interceptor call, this page will be viewed until the API call is resolved
    return false;
  }
};