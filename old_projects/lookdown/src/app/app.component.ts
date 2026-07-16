import {Component, OnInit} from '@angular/core';
import {PageNames, Pages} from '../model/page.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public pages = Pages;
  public pageNames = PageNames;

  constructor() { }

  ngOnInit(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
    if (isTablet && window.matchMedia('(orientation: landscape)').matches) {
      alert('Tablet in landscape format are currently not supported. Please use the portrait format or another device');
    }
  }
}
