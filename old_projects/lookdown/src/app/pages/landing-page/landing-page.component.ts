import {Component, OnInit} from '@angular/core';
import {ScrollService} from '../../../services/scroll/scroll.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  constructor(public scrollService: ScrollService) { }

  ngOnInit(): void {
  }
}
