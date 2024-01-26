import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Endpoints } from '../_constants/endpoints';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userAuthService = inject(UserAuthService);
  private httpclient = inject(HttpClient);
  BASE_URL = 'http://localhost:9090';
  requestHeaders = new HttpHeaders(
    {"No-Auth": "True"}
  );

  constructor() { }

  public login(loginData: any) {
    let url = this.BASE_URL + Endpoints.AUTHENTICATE;
    let body = {
      "userName": loginData.value.userName,
      "userPassword": loginData.value.userPassword
    };
    return this.httpclient.post(url, body, { headers: this.requestHeaders });
  }

  public roleMatch(allowedRoles: any[]): boolean {
    let isMatch = false;
    const userRoles:any = this.userAuthService.getRoles();

    if(userRoles != null && userRoles) {
      for(let i=0; i<userRoles.length; i++) {
        for(let j=0; j< allowedRoles.length; j++) {
          if(userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }

  public forUser() {
    let url = this.BASE_URL + Endpoints.FOR_USER;
    return this.httpclient.get(url, { responseType: 'text' });
  }

  public forAdmin() {
    let url = this.BASE_URL + Endpoints.FOR_ADMIN;
    return this.httpclient.get(url, { responseType: 'text' });
  }
}
