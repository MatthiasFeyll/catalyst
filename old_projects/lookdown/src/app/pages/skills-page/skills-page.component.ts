import {Component, OnInit} from '@angular/core';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {Skill, SkillCategories} from '../../../model/skills.model';
import {SwipeDirection, SwipeService} from '../../../services/swipe/swipe.service';
import {ScrollService} from '../../../services/scroll/scroll.service';


const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    query(':enter',  style({opacity: 0})),
    query(':leave', [animate('150ms ease-out', style({ opacity: 0 })), style({ height: 0 })], {optional: true}),
    query(':enter', animate('150ms 75ms ease-in', style({ opacity: 1 })), {optional: true}),
  ])
]);

@Component({
  selector: 'app-skills-page',
  templateUrl: './skills-page.component.html',
  styleUrls: ['./skills-page.component.scss'],
  animations: [fadeAnimation]
})
export class SkillsPageComponent implements OnInit {
  public readonly numberOfTotalStars = 5;

  public activeCategoryIndex = 0;
  public skillCategories = SkillCategories;

  constructor(private swipeService: SwipeService, public scrollService: ScrollService) { }

  ngOnInit(): void {
    this.swipeService.skillsPageSwipeListener.subscribe(direction => {
      let nextActiveCategoryIndex = this.activeCategoryIndex;
      nextActiveCategoryIndex += direction === SwipeDirection.LEFT ? 1 : -1;

      // if next index is in range between zero and number of categories
      if (nextActiveCategoryIndex >= 0 && nextActiveCategoryIndex < this.skillCategories.length) {
        this.setActiveCategoryIndex(nextActiveCategoryIndex);
      }
    });
  }

  get getActiveSkills(): Skill[] {
    return this.skillCategories[this.activeCategoryIndex].skills;
  }

  public setActiveCategoryIndex(newIndex: number): void {
    this.activeCategoryIndex = newIndex;
  }
}
