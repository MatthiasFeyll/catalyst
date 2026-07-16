export interface Skill {
  name: string;
  numberOfStars: number;
}

interface SkillCategory {
  name: string;
  iconClass: string;
  skills: Skill[];
}

export const SkillCategories: SkillCategory[] = [
  {
    name: 'Programming',
    iconClass: 'fas fa-code',
    skills: [
      {name: 'Shell scripting', numberOfStars: 4},
      {name: 'C++', numberOfStars: 3},
      {name: 'Java', numberOfStars: 3},
      {name: 'Android development', numberOfStars: 3},
      {name: 'OpenGL', numberOfStars: 2},
      {name: 'Qt', numberOfStars: 2},
      {name: 'Python', numberOfStars: 2},
    ]
  },
  {
    name: 'Web',
    iconClass: 'fas fa-globe',
    skills: [
      {name: 'Javascript', numberOfStars: 5},
      {name: 'Typescript', numberOfStars: 4},
      {name: 'Bootstrap', numberOfStars: 4},
      {name: 'Angular', numberOfStars: 4},
      {name: 'CSS/SCSS', numberOfStars: 4},
      {name: 'Vue.js', numberOfStars: 3},
      {name: 'Bulma', numberOfStars: 3},
      {name: 'webpack', numberOfStars: 3},
      {name: 'Symfony', numberOfStars: 3},
      {name: 'PHP', numberOfStars: 3},
    ]
  },
  {
    name: 'Tools',
    iconClass: 'fas fa-toolbox',
    skills: [
      {name: 'Software architecture', numberOfStars: 4},
      {name: 'JetBrains IDEs', numberOfStars: 4},
      {name: 'Git', numberOfStars: 4},
      {name: 'Testing', numberOfStars: 3},
      {name: 'PostgreSQL', numberOfStars: 3},
      {name: 'JPA / Eclipse Link', numberOfStars: 3},
      {name: 'Figma', numberOfStars: 3},
      {name: 'GitLab Ci/CD', numberOfStars: 3},
      {name: 'GitLab Runner', numberOfStars: 2},
      {name: 'Visual Studio Code', numberOfStars: 2},
    ]
  }
];
