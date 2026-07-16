import { faGitlab } from "@fortawesome/free-brands-svg-icons";
import { faHexagonNodes, faLaptopCode, faTerminal, faUser, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ReferenceType {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    images: Array<{ src: string; title: string }>;
    tags: string[];
    actions?: {
        label: string;
        url: string;
        icon?: IconDefinition;
    }[];
    icon: IconDefinition;
}

export const References: ReferenceType[] = [
    {
        id: 2,
        title: "Personal Page",
        description: "With my latest website, I have taken a significant step forward in web development by leveraging modern technologies such as Next.js, React, and Tailwind CSS. This project was not only about building a highly performant and responsive web application but also about optimizing the development process through AI. By integrating AI-driven tools, I was able to complete the entire website within just one week, significantly improving efficiency while maintaining high quality. This experience reinforced my belief in the importance of AI in software development and allowed me to refine my skills further. Over the years, I have continuously evolved as a developer. My first website, built five years ago, was a self- hosted project using PHP, plain JavaScript, and Bulma. Later, I transitioned to Angular and Bootstrap for my second website, focusing on a mobile - first approach and hosting it on an IaaS platform.N ow, with my third and most advanced website, hosted on Vercel(PaaS), I have combined modern frontend technologies with AI - assisted development to streamline workflows and accelerate project delivery.",
        tags: ["Next.js", "Vercel", "AI driven development"],
        images: [
            { src: "/images/references/reference-lookdown.png", title: "Lookup - My second website with Angular and special mobile UI/UX" },
            { src: "/images/references/references_lookup.png", title: "Lookdown - My first website named after the unix nslookup command" },
        ],
        actions: [
            { label: "GitLab Repo", url: "https://gitlab.com/M-Felly/median_ai", icon: faGitlab }
        ],
        subtitle: "Next-Gen Portfolio - A journey of improvement",
        icon: faUser,
    },
    {
        id: 1,
        title: "Micro-Frontend-Architecture",
        subtitle: "Scalable Frontend Architecture",
        description: "In my Bachelor's thesis, I explored the concept of Micro-Frontend Architecture, a new approach in web development that applies the principles of Microservices to the frontend. This architecture enables independent teams to develop, deploy, and maintain different parts of a web application separately, providing several advantages. By using independent repositories, teams can work autonomously, reducing dependencies and simplifying maintenance. Smaller codebases make applications more manageable, while independent deployments accelerate development cycles and allow for faster feature releases. As part of my research, I focused on the practical migration of a monolithic frontend to a Micro-Frontend Architecture. This hands - on transformation allowed me to analyze both the benefits and challenges of such a transition.Throughout the process, I gained valuable insights into key factors for a successful migration, including architectural decisions, integration strategies, and potential pitfalls. This experience provided me with a deep understanding of how to effectively transition to a scalable and modular frontend structure.",
        tags: ["Distributed Architecture", "Module Federation", "Bachelor Thesis"],
        images: [
            { src: "/images/references/client_side_routing.png", title: "A simple website example that demonstrates the challenge of multiple routing levels" },
            { src: "/images/references/module_federation_example.png", title: "Resource requirements management. It shows that for Micro Frontend B only Resource R3 has to be fetched" },
            { src: "/images/references/bachelor_thesis.png", title: "My final Bachelor Thesis" },
        ],
        icon: faLaptopCode
    },
    {
        id: 3,
        title: "Software provisioning",
        description: "This project provides a fully automated setup for my laptop using Ansible. It installs and configures essential tools such as the Sway window manager, various shell helper scripts and development tools like Git, vs code, and Docker. By using this solution, I can quickly set up a new system without manual intervention, saving valuable time. A key advantage of this setup is its portability—whether I’m reinstalling my laptop, I can apply my personal configuration with a single command. This ensures a consistent and efficient development environment",
        tags: ["Ansible", "Vagrant", "Infrastructure as Code", "Endeavour OS"],
        subtitle: "Automated OS Provisioning Solution",
        icon: faTerminal,
        images: [
            { src: "/images/references/provision_wallpaper.png", title: "After finish setup. (Yes im a Hollow Knight fan)" },
        ]
    },
    {
        id: 4,
        title: "goSDN",
        description: "In my working student position at Hochschule Darmstadt, I am responsible for developing the frontend of the goSDN project using React and Bootstrap.While I can’t claim to have built goSDN all by myself—our talented team handles the complex backend and SDN controller aspects—my role is to ensure that the user interface is both intuitive and visually appealing.By leveraging React’s component- based architecture and Bootstrap’s responsive design framework, I strive to create a seamless and engaging user experience that complements the robust functionality of goSDN.",
        tags: ["React", "Redux", "Bootstrap"],
        subtitle: "A seamless and intuitive UI for goSDN",
        icon: faHexagonNodes,
        images: [
            { src: "/images/references/goSDN_landingpage.png", title: "Frontend view of goSDN" },
        ],
        actions: [
            { label: "GitLab Repo", url: "https://code.fbi.h-da.de/danet/gosdn", icon: faGitlab }
        ]
    }
];