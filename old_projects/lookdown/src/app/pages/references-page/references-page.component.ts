import {Component, OnInit} from '@angular/core';
import {References} from '../../../model/references.model';
import {AxisDirection, isAxisDirection, SwipeDirection, SwipeService} from '../../../services/swipe/swipe.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ResponsiveService} from '../../../services/responsive/responsive.service';

const ESCAPE_BUTTON = 'Escape';

@Component({
  selector: 'app-references-page',
  templateUrl: './references-page.component.html',
  styleUrls: ['./references-page.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition('* <=> *', [
        style({opacity: 0}),
        animate('150ms ease-out', style({ opacity: 0 })),
        animate('200ms ease-in', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class ReferencesPageComponent implements OnInit {
  public readonly references = References;
  public visibleReferenceIndex = 0;

  /**
   * This bool flag stands for all references.
   * But its guaranteed that only one ref is visible at the same time
   */
  public detailsOpen = false;
  public collapsed = false;

  public backgroundImageUrl = '';
  public backgroundGradientColor = '';

  constructor(private swipeService: SwipeService, private responsiveService: ResponsiveService) { }

  ngOnInit(): void {
    this.backgroundGradientColor = window.getComputedStyle(document.body).getPropertyValue('background-color');
    this.backgroundGradientColor = this.backgroundGradientColor.substr(4, this.backgroundGradientColor.length - 5);

    document.addEventListener('keyup', this.onEscapePressed);
    this.handleSwipe();
    this.handleNavIconClicked();

    this.changeBackground();
  }

  /**
   * Actual changing index method
   *
   * If the parameter is negative respectively out of range, shift it between
   * the range of zero to {@link references} length
   *
   * @param absolutReferenceIndex absolut index (can be negative)
   */
  public changeVisibleReferenceAbsolut = (absolutReferenceIndex: number): void => {
    this.collapsed = false;

    if (!this.isNextIndexInRange(absolutReferenceIndex)) {
      // shitty javascript bug in the modulo operation with negative values lol
      absolutReferenceIndex = absolutReferenceIndex < 0 ?
        absolutReferenceIndex + this.references.length :
        absolutReferenceIndex % this.references.length
      ;
    }

    this.visibleReferenceIndex = absolutReferenceIndex;
    this.changeBackground();
  }

  /*******************************************************************
   *                Action methods from click events
   *******************************************************************/

  public changeVisibleReferenceRelative = (nextRelativeReferenceIndex: number): void => {
    this.changeVisibleReferenceAbsolut(this.visibleReferenceIndex + nextRelativeReferenceIndex);
  }

  public collapseText(): void {
    this.collapsed = !this.collapsed;
  }

  public redirectTo(url: string): void {
    window.open(url, '_blank');
  }

  public closeDetails = (): void => {
    this.detailsOpen = false;
    // after swipe animation (300ms duration) is over reset potential collapsed description
    setTimeout(() => {
      this.collapsed = false;
    }, 300);
  }

  /*******************************************************************
   *                     Internal action handler
   *******************************************************************/
  private handleNavIconClicked(): void {
    const footer = document.getElementsByTagName('footer').item(0);
    const desktopNavbar = document.getElementById('desktop-nav-item-container');

    footer?.addEventListener('click', () => {
      this.closeDetails();
    });

    desktopNavbar?.addEventListener('click', () => {
      setTimeout(this.closeDetails, 500);
    });
  }

  private handleSwipe(): void {
    this.swipeService.referencePageSwipeListener.subscribe(direction => {
      if (isAxisDirection(direction, AxisDirection.HORIZONTAL)) {
        const nextVisibleReferenceIndex = this.visibleReferenceIndex + (direction === SwipeDirection.RIGHT ? -1 : 1);
        this.changeVisibleReferenceAbsolut(nextVisibleReferenceIndex);

        return;
      }

      // vertical swipe down swipes the details up. But if the collapsed description
      // text is scrollable due to a short screen there a two scroll actions for one direction (down)
      /*if (this.detailsOpen && direction === SwipeDirection.DOWN) {
        this.closeDetails();
      }*/
    });
  }

  private onEscapePressed = (event: KeyboardEvent): void => {
    if (event.code === ESCAPE_BUTTON) {
      this.detailsOpen = false;
    }
  }

  /*******************************************************************
   *                     Internal helper methods
   *******************************************************************/
  private changeBackground = (): void => {
    if (this.responsiveService.isDesktop()) {
      return;
    }

    this.backgroundImageUrl = '/assets/images/' + References[this.visibleReferenceIndex].frontView.image.name;
  }

  private isNextIndexInRange(nextIndex: number): boolean {
    return nextIndex >= 0 && nextIndex < this.references.length;
  }
}
