import {EventEmitter, Injectable} from '@angular/core';
import {ResponsiveService} from '../responsive/responsive.service';


/**
 * The mobile navbar can be set hidden with this service.
 * The main purpose for this case is when a mobile device user wanna
 * type something and the virtual keyboard opens.
 */
@Injectable({
  providedIn: 'root'
})
export class KeyboardInputService {
  // tslint:disable-next-line:variable-name
  private _keyboardInputEmitter: EventEmitter<boolean>;


  constructor(private responsiveService: ResponsiveService) {
    this._keyboardInputEmitter = new EventEmitter<boolean>();

    window.addEventListener('resize', () => {
      this._keyboardInputEmitter = new EventEmitter<boolean>();
      this.initEmitter();
    });

    window.addEventListener('load', this.initEmitter);
  }


  private initEmitter = (): void => {
    if (this.responsiveService.isDesktop()) {
      return;
    }

    const inputFields = document.getElementsByTagName('input');
    const textareaFields = document.getElementsByTagName('textarea');

    const allInputFields = Array.prototype.concat(inputFields, textareaFields);

    for (const inputSource in allInputFields) {
      if (allInputFields.hasOwnProperty(inputSource)) {
        for (const key in allInputFields[inputSource]) {
          if (allInputFields[inputSource].hasOwnProperty(key)) {
            allInputFields[inputSource][key].addEventListener('focusin', () => this._keyboardInputEmitter.emit(true));
            allInputFields[inputSource][key].addEventListener('focusout', () => this._keyboardInputEmitter.emit(false));
          }
        }
      }
    }
  }

  get keyboardInputEmitter(): EventEmitter<boolean> {
    return this._keyboardInputEmitter;
  }
}
