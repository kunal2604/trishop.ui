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

  public isAdmin() {
    const roles : any[]= this.getRoles();
   for(var i=0; i<roles.length; i++) {
    if(roles[i]['roleName'] == 'Admin')
      return true
   }
    return false;
  }

  public isUser() {
    const roles : any[]= this.getRoles();
   for(var i=0; i<roles.length; i++) {
    if(roles[i]['roleName'] == 'User')
      return true
   }
    return false;
  }
}
