import {Component, OnInit} from '@angular/core';
import {ScrollService} from '../../services/scroll/scroll.service';
import {Pages} from '../../model/page.model';
import {KeyboardInputService} from '../../services/keyboard-input/keyboard-input.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public readonly pages = Pages;

  constructor(public scrollService: ScrollService, public keyboardInputService: KeyboardInputService) { }

  ngOnInit(): void {}
}
