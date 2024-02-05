import { Directive, EventEmitter, HostBinding, HostListener, Output, inject } from '@angular/core';
import { FileHandle } from './_model/file-handle.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { BrowserService } from './_services/browser.service';

@Directive({
  selector: '[appDrag]',
  standalone: true
})
export class DragDirective {
  private _sanitizer = inject(DomSanitizer);
  private _browserService = inject(BrowserService);
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding("style.background") private backgroud = "#eee";
  constructor() { }

  @HostListener("dragover", ["$event"])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroud = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroud = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroud = "#eee";
  
    let fileHandles: FileHandle[] = [];

    if(event.dataTransfer?.files) {
      for(var i=0; i<event.dataTransfer.files.length; i++) {
        let file = event.dataTransfer.files[i];
        let url: SafeUrl = this._sanitizer.bypassSecurityTrustUrl(this._browserService.createUrlFromFile(file));
        let fileHandle: FileHandle;
        fileHandle = {file, url}
        fileHandles.push(fileHandle);
      }
      this.files.emit(fileHandles);
    }
  }
}
