import {EventEmitter, Injectable} from '@angular/core';
import {Page, PageNames, Pages} from '../../model/page.model';
import {ResponsiveService} from '../responsive/responsive.service';

// tslint:disable:no-non-null-assertion
@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  // emits the page id
  // tslint:disable-next-line:variable-name
  private readonly _scrollEventEmitter: EventEmitter<Page>;
  private readonly pages = Pages;
  public readonly pageNames = PageNames;

  private pageIndex = 0;

  private pageHeight = -1;

  private domApp: HTMLElement | null = null; // will throw an error if object is null after window loaded

  constructor(private responsiveService: ResponsiveService) {
    this._scrollEventEmitter = new EventEmitter<Page>();
    window.addEventListener('load', () => {
      this.domApp = document.getElementById('app');

      if (!this.domApp) {
        throw new Error('App element not found. Scrolling does not working properly');
      }

      this.calculatePageHeight();
      this.initScrollHandler();
    });

    window.addEventListener('resize', this.calculatePageHeight);

    this._scrollEventEmitter.subscribe(page => ScrollService.setURL(page.id));
  }

  private static scrollTo(target: HTMLElement|null): void {
    if (target) {
      target.scrollIntoView();
    }
  }

  private static setURL(id: string): void {
    history.replaceState({}, '', '#' + id);
  }

  /**
   * Scroll handler for manual scrolling.
   *
   * Calculate the current visible page index. Emit the event accordingly
   */
  private initScrollHandler = (): void => {
    this.domApp!.onscroll = () => {
      let calculatedIndex = Math.round(this.domApp!.scrollTop / this.pageHeight);
      if (calculatedIndex >= this.pages.length) {
        calculatedIndex = this.pages.length - 1;
      }

      if (this.pageIndex !== calculatedIndex) {
        this.pageIndex = calculatedIndex;
        this.emitScroll(this.pages[this.pageIndex]);
      }
    };
  }

  private emitScroll = (page: Page): void => {
    this._scrollEventEmitter.emit(page);
  }

  private calculatePageHeight = (): void => {
    this.pageHeight = this.domApp!.clientHeight;
    // view height minus 8vh for the top navbar on desktop devices
    if (this.responsiveService.isDesktop()) {
      this.pageHeight *= 0.92;
    }
  }

  /*******************************************************************
   *                         Scroll actions
   *******************************************************************/
  public scrollToPage(pageName: PageNames): void {
    if (!PageNames[pageName]) {
      console.error('Page name ' + pageName + ' does not exist');
      return;
    }

    const pageObject = document.getElementById(Pages[pageName].id);
    ScrollService.scrollTo(pageObject);
  }

  /*******************************************************************
   *                            Getter
   *******************************************************************/
  get scrollEventEmitter(): EventEmitter<Page> {
    return this._scrollEventEmitter;
  }
}
