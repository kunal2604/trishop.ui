import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserService {
  private _platformId = inject(PLATFORM_ID);
  private _isBrowser: boolean = isPlatformBrowser(this._platformId);
  
  constructor() {
  }

  public isBrowser() {
    return this._isBrowser;
  }

  public createUrlFromFile(file: any) : string | any {
    if(this._isBrowser)
      return window.URL.createObjectURL(file);
    return;
  }

  public atob(picByte: any): string | any {
    if(this._isBrowser)
      return window.atob(picByte);
    return;
  }
}
