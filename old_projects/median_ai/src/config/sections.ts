import { AboutMeSection } from "@/components/sections/AboutMeSection";
import { ContactSection } from "@/components/sections/ContactSection/ContactSection";
import HomeSection from "@/components/sections/HomeSection";
import { ReferenceSection } from "@/components/sections/ReferenceSection/ReferencesSection";
import { SkillSection } from "@/components/sections/SkillSection";

export type SectionType = {
    component: React.FC;
    name: string,
    id: string,
    background_url: string
}

export const Sections: Array<SectionType> = [
    {
        component: HomeSection,
        name: "Home",
        id: 'home',
        background_url: '/images/background/mf_looking_left_full.jpg'
    },
    {
        component: AboutMeSection,
        name: "About Me",
        id: 'aboutme',
        background_url: '/images/background/mf_srilanka_2.jpg'
    },
    // {
    //     component: PhilosophySection,
    //     name: "Philosophy",
    //     id: 'philosophy',
    //     background_url: '/images/background/mf_sunset.jpg'
    // },
    {
        component: ReferenceSection,
        name: "References",
        id: 'references',
        background_url: '/images/background/train.jpg'
    },
    {
        component: SkillSection,
        name: "Skills",
        id: 'skills',
        background_url: '/images/background/stage.jpg'
    },
    {
        component: ContactSection,
        name: "Contact",
        id: 'contact',
        background_url: '/images/background/mf_looking_away.jpg'
    }
]

export const StartSection = Sections[0];