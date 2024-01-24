import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor() { }

  public setRoles(roles:[]) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    const item = localStorage.getItem('roles');
    if(item)
      return JSON.parse(item);
    return [];
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    return localStorage.getItem('jwtToken');
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
