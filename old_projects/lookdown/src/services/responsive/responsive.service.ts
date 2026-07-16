import { Injectable } from '@angular/core';

const MEDIUM_BREAKPOINT = 767; // in px
const LARGE_BREAKPOINT = 992; // in px

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {

  constructor() { }

  public isDesktop(): boolean {
    return window.outerWidth >= LARGE_BREAKPOINT;
  }
}
