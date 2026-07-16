import {EventEmitter, Injectable} from '@angular/core';
import {PageNames, Pages} from '../../model/page.model';

export enum SwipeDirection {
  RIGHT = 9, LEFT = 3, UP = 2, DOWN = 4
}

export enum AxisDirection {
  VERTICAL = 2,
  HORIZONTAL = 3,
}

export const isAxisDirection = (direction: SwipeDirection, axis: AxisDirection): boolean => {
  return direction % axis === 0;
};


const TOUCH_TRIGGER_THRESHOLD = 50;

@Injectable({
  providedIn: 'root'
})
export class SwipeService {
  // tslint:disable:variable-name
  private readonly _skillsPageSwipeListener: EventEmitter<SwipeDirection>;
  private readonly _globalSwipeListener: EventEmitter<SwipeDirection>;
  private readonly _referencesSwipeListener: EventEmitter<SwipeDirection>;

  constructor() {
    this._skillsPageSwipeListener = new EventEmitter<SwipeDirection>();
    this._globalSwipeListener = new EventEmitter<SwipeDirection>();
    this._referencesSwipeListener = new EventEmitter<SwipeDirection>();

    window.addEventListener('load', () => {
      this.registerTouchListeners();
    }, false);
  }

  private registerTouchListeners(): void {
    // register skills page swipe listener
    this.initTouchListener('app', this._globalSwipeListener);
    this.initTouchListener('skill-container', this._skillsPageSwipeListener);
    this.initTouchListener(Pages[PageNames.REFERENCES_PAGE].id, this._referencesSwipeListener);
  }

  private initTouchListener(targetID: string, event: EventEmitter<SwipeDirection>): void {
    const targetPage = document.getElementById(targetID);
    if (!targetPage)  {
      console.error('Object not found: ' + targetID);
      return;
    }
    this.injectTouchHandler(targetPage, event);
  }

  private injectTouchHandler(target: HTMLElement, listener: EventEmitter<any>): void {
    let startTouchX: number;
    let startTouchY: number;

    target.addEventListener('touchstart', (e) => {
      startTouchX = e.touches[0].clientX;
      startTouchY = e.touches[0].clientY;
    }, false);

    target.addEventListener('touchend', (e) => {
      // positive => swipe left | negative =>  swipe right
      const deltaX = e.changedTouches[0].clientX - startTouchX;
      const deltaY = e.changedTouches[0].clientY - startTouchY;
      const deltaXAbs = Math.abs(deltaX);
      const deltaYAbs = Math.abs(deltaY);

      if (deltaXAbs < TOUCH_TRIGGER_THRESHOLD && deltaYAbs < TOUCH_TRIGGER_THRESHOLD) {
        return;
      }

      let direction;
      if (deltaYAbs > deltaXAbs) {
        direction = deltaY < 0 ? SwipeDirection.UP : SwipeDirection.DOWN;
      }else {
        direction = deltaX < 0 ? SwipeDirection.LEFT : SwipeDirection.RIGHT;
      }

      listener.emit(direction);
    }, false);
  }

  get skillsPageSwipeListener(): EventEmitter<SwipeDirection> {
    return this._skillsPageSwipeListener;
  }

  get globalSwipeListener(): EventEmitter<SwipeDirection> {
    return this._globalSwipeListener;
  }

  get referencePageSwipeListener(): EventEmitter<SwipeDirection> {
    return this._referencesSwipeListener;
  }
}
