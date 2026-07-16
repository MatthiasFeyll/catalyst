import {Component, OnInit} from '@angular/core';
import {ResponsiveService} from '../../../services/responsive/responsive.service';
import {ScrollService} from '../../../services/scroll/scroll.service';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.scss']
})
export class AboutMePageComponent implements OnInit {
  public collapsed = false;

  constructor(public responsiveService: ResponsiveService, public scrollService: ScrollService) { }

  ngOnInit(): void {
    this.collapsed = this.responsiveService.isDesktop();
  }

  public collapseText(): void {
    if (this.responsiveService.isDesktop()) {
      return;
    }

    this.collapsed = !this.collapsed;
  }
}
