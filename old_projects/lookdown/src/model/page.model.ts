export interface Page {
  id: string;
  index: number;
}

export enum PageNames {
  LANDING_PAGE, ABOUT_ME_PAGE, SKILLS_PAGE, REFERENCES_PAGE, CONTACT_PAGE
}

export const Pages: Page[] = [
  {
    id: 'landing-page',
    index: PageNames.LANDING_PAGE,
  },
  {
    id: 'about-me',
    index: PageNames.ABOUT_ME_PAGE,
  },
  {
    id: 'skills',
    index: PageNames.SKILLS_PAGE,
  },
  {
    id: 'references',
    index: PageNames.REFERENCES_PAGE,
  },
  {
    id: 'contact',
    index: PageNames.CONTACT_PAGE,
  }
];
