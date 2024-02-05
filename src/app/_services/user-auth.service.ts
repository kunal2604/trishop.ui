import { Injectable, inject } from '@angular/core';
import { BrowserService } from './browser.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private _browserService = inject(BrowserService);
  _isBrowser: boolean;

  constructor() {
    this._isBrowser = this._browserService.isBrowser();
  }

  public setRoles(roles: []) {
    if (this._isBrowser)
      localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    if (this._isBrowser) {
      const item = localStorage.getItem('roles');
      if (item)
        return JSON.parse(item);
      return [];
    }
    return [];
  }

  public setToken(jwtToken: string) {
    if (this._isBrowser)
      localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken() {
    if (this._isBrowser)
      return localStorage.getItem('jwtToken');
    return '';
  }

  public clearLocalStorage() {
    if (this._isBrowser)
      localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    for (var i = 0; i < roles.length; i++) {
      if (roles[i]['roleName'] == 'Admin')
        return true;
    }
    return false;
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    for (var i = 0; i < roles.length; i++) {
      if (roles[i]['roleName'] == 'User')
        return true;
    }
    return false;
  }
}
