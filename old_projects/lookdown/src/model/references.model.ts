interface Reference {
  title: string;
  frontView: {
    image: {
      name: string;
      alt?: string;
    };
    bulletPoints: Array<string>;
  };
  detailsView: {
    technologies: Array<{
      techIconName: string;
      techName: string;
    }>;
    description: string;
    actionButton: {
      text: string;
      iconName: string;
      url: string;
    }
  };
}

export const References: Reference[] = [
  {
    title: 'Personal portfolio',
    frontView: {
      image: {
        name: 'reference-lookdown.png',
        alt: 'Three devices with an image of this website'
      },
      bulletPoints: ['Minimalistic design', 'Prototyped for mobile & PC', 'Web app intuitive'],
    },
    detailsView: {
      description: 'The second version of my personal portfolio website. A modern solution for applications and presenting myself. ' +
        'The website is designed with figma for mobile and desktop devices. Therefore I worked with the "mobile first" approach. ' +
        'The usability of the mobile version is based on the mobile app usability and navigation. You can swipe in all directions to see or hide information. ' +
        'That makes it more comfortable for using the website with just one thumb. ' +
        'Feel free to have a look of the design progress that have improved over iterations of feedback. ' +
        '<a href="https://www.figma.com/proto/WebgKgiwEsNhC223oZdW8l/Portfolio-mobile?scaling=scale-down&page-id=0%3A1&starting-point-node-id=3%3A2&node-id=3%3A2">See the prototypes.</a>',
      technologies: [
        {techIconName: 'angular-icon.png', techName: 'Angular'},
        {techIconName: 'bootstrap-icon.png', techName: 'Bootstrap 5'}
      ],
      actionButton: {
        iconName: 'gitlab-icon.png',
        text: 'Source code',
        url: 'https://gitlab.com/M-Felly/lookdown',
      }
    }
  },

  {
    title: 'DeadlineCalendar',
    frontView: {
      image: {
        name: 'reference_deadline_calendar.png',
        alt: 'DeadlineCalendar welcome and first screen'
      },
      bulletPoints: ['Time management app', 'Pre user analysis & evaluation', 'Usability inspection'],
    },
    detailsView: {
      description: 'The DeadlineCalendar is an Android app programmed as a project with four other students. Together we developed ' +
        'an app with a wide analyse, design, implement and presentation phase within the third semester. In the first phase we analysed ' +
        'our target groups stereotyping them to make them more abstract in their needs for our app. ' +
        'After that we created prototypes for each view. To make each view as usable as possible to fulfill all ui/ux requirements was our highest priority. ' +
        'Afterwards we finished implementing the app, we presented them our professor and supervisor.',
      technologies: [
        {techIconName: 'room-icon.png', techName: 'Android Room'},
        {techIconName: 'volley-icon.png', techName: 'Android Volley'}
      ],
      actionButton: {
        iconName: 'deadline-calendar-icon.png',
        text: 'Presentation',
        url: 'https://gitlab.com/M-Felly/deadlinecalendar/-/blob/master/DeadlineKalender.pdf',
      }
    }
  },

  {
    title: 'MF-Lookup',
    frontView: {
      image: {
        name: 'references_lookup.png',
        alt: 'Three devices with an image of the old version of my personal portfolio'
      },
      bulletPoints: ['High scalable web app', 'Low network usage', 'Multilingual'],
    },
    detailsView: {
      description: 'MF-Lookup is my first version of a personal portfolio website. ' +
        'Due to the low complexity I just used Typescript, Bulma and Twig. In comparison to the second version this website ' +
        'is a simple information gathering website. This project gave me a great insight which technologies and architectural decisions are important.',
      technologies: [
        {techIconName: 'typescript-icon.png', techName: 'Typescript 3'},
        {techIconName: 'bulma-icon.png', techName: 'Bulma'}
      ],
      actionButton: {
        iconName: 'gitlab-icon.png',
        text: 'Source code',
        url: 'https://gitlab.com/M-Felly/feyll_lookup',
      }
    }
  },
];
