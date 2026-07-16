import { Tab, TabList, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { JSX, useRef, useState } from 'react';
import { DiScrum } from 'react-icons/di';
import {
  FaAngular,
  FaAws,
  FaCode,
  FaDatabase,
  FaJava,
  FaNodeJs,
  FaPhp,
  FaRaspberryPi,
  FaSymfony,
  FaWindows,
} from 'react-icons/fa';
import { FaGolang } from 'react-icons/fa6';
import { GiWatchtower } from 'react-icons/gi';
import {
  SiAndroid,
  SiAnsible,
  SiBootstrap,
  SiBulma,
  SiCloudflare,
  SiCplusplus,
  SiDocker,
  SiDoctrine,
  SiFreebsd,
  SiGin,
  SiGit,
  SiHibernate,
  SiInsomnia,
  SiJavascript,
  SiJetbrains,
  SiJinja,
  SiKubernetes,
  SiLinux,
  SiNestjs,
  SiNextcloud,
  SiNextdotjs,
  SiNginx,
  SiPrisma,
  SiPython,
  SiReact,
  SiRust,
  SiSqlalchemy,
  SiSwagger,
  SiTailwindcss,
  SiTerraform,
  SiThymeleaf,
  SiVagrant,
  SiVercel,
  SiVim,
  SiVuedotjs,
  SiZsh,
} from 'react-icons/si';
import { TbApi, TbTemplate } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';
import { useSwipe } from '../hooks/useSwipe';

const iconMap: Record<string, JSX.Element> = {
  'C++': <SiCplusplus />,
  Java: <FaJava />,
  Python: <SiPython />,
  'Shell scripting': <SiZsh />,
  GitOps: <SiGit />,
  Kubernetes: <SiKubernetes />,
  AWS: <FaAws />,
  JavaScript: <SiJavascript />,
  React: <SiReact />,
  Vue: <SiVuedotjs />,
  'Next.js': <SiNextdotjs />,
  Docker: <SiDocker />,
  Bootstrap: <SiBootstrap />,
  Tailwind: <SiTailwindcss />,
  Rust: <SiRust />,
  'VS Code': <VscVscode />,
  JetBrains: <SiJetbrains />,
  Vercel: <SiVercel />,
  Terraform: <SiTerraform />,
  Ansible: <SiAnsible />,
  Linux: <SiLinux />,
  Scrum: <DiScrum />,
  // Fallbacks for missing official icons
  SQLAlchemy: <SiSqlalchemy />,
  Hibernate: <SiHibernate />,
  Doctrine: <SiDoctrine />,
  Thymeleaf: <SiThymeleaf />,
  Jinja2: <SiJinja />,
  Twig: <TbTemplate />,
  Symfony: <FaSymfony />,
  'Express.js': <FaNodeJs />,
  Bulma: <SiBulma />,
  'Agile Development': <DiScrum />,
  Insomnia: <SiInsomnia />,
  Swagger: <SiSwagger />,
  Angular: <FaAngular />,
  Go: <FaGolang />,
  Raspberry: <FaRaspberryPi />,
  Nginx: <SiNginx />,
  Android: <SiAndroid />,
  Javascript: <SiJavascript></SiJavascript>,
  Windows: <FaWindows />,
  PHP: <FaPhp />,
  Nextcloud: <SiNextcloud />,
  Gin: <SiGin />,
  NestJS: <SiNestjs />,
  Vagrant: <SiVagrant />,
  REST: <TbApi />,
  Prisma: <SiPrisma />,
  Watchtower: <GiWatchtower />,
  'Free BSD': <SiFreebsd></SiFreebsd>,
  Vim: <SiVim></SiVim>,
  Cloudflare: <SiCloudflare></SiCloudflare>,
  Protobuf: <FaCode></FaCode>,
};

export const SkillSection = () => {
  const categories = {
    'Web Development': {
      Frontend: ['React', 'Angular', 'Vue', 'Next.js'],
      Style: ['Bootstrap', 'Tailwind', 'Bulma'],
      Backend: ['Symfony', 'Express.js', 'Gin', 'NestJS'],
      Communication: ['REST', 'Protobuf', 'Swagger'],
    },
    Programming: {
      Languages: ['C++', 'Java', 'Python', 'Javascript', 'Go', 'PHP'],
      'Database ORM': ['SQLAlchemy', 'Hibernate', 'Doctrine'],
      Templating: ['Thymeleaf', 'Jinja2', 'Twig'],
    },
    DevOps: {
      Cloud: ['AWS', 'Vercel', 'Cloudflare'],
      Automation: ['Ansible', 'Terraform', 'Vagrant', 'Docker', 'Kubernetes', 'Watchtower'],
    },
    Other: {
      'Operating Systems': ['Windows', 'Raspberry', 'Linux', 'Free BSD', 'Android'],
      Tools: ['VS Code', 'JetBrains', 'Insomnia', 'Vim'],
    },
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const categoriesArray = Object.keys(categories);
  const componentRef = useRef<HTMLDivElement>(null);

  useSwipe({
    elementRef: componentRef,
    allowedDirections: ['left', 'right'],
    onSwipe(direction) {
      const newIndex =
        direction === 'left'
          ? (selectedIndex + 1) % categoriesArray.length
          : (selectedIndex - 1 + categoriesArray.length) % categoriesArray.length;
      setSelectedIndex(newIndex);
    },
  });

  return (
    <section className="h-screen lg:ms-[10vw] py-5 pt-[10vh] md:pt-[18vh] lg:w-4/5 px-4 flex flex-col">
      <h2 className="text-3xl lg:text-4xl font-bold text-text px-2">Skills</h2>

      <Tab.Group
        className="w-full pt-4 lg:pt-8"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        ref={componentRef}
      >
        <TabList className="flex space-x-2 overflow-x-auto pb-4 px-2">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `px-3 py-1.5 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium text-gray-300 transition-colors
                                ${
                                  selected
                                    ? 'bg-primary text-white'
                                    : 'bg-white/5 backdrop-blur-sm hover:bg-white/10'
                                }`
              }
            >
              {category}
            </Tab>
          ))}
        </TabList>

        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 lg:gap-8 h-full">
          <Tab.Panels className="w-full lg:w-3/5 flex-1 pb-2 px-2">
            <AnimatePresence mode="wait">
              {Object.entries(categories).map(([category, subCategories]) => (
                <Tab.Panel key={category}>
                  <Transition
                    as={motion.div}
                    show={true}
                    enter="transition-opacity duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="space-y-6 lg:space-y-8">
                      <div className="flex flex-col justify-center">
                        {Object.entries(subCategories).map(([subCategory, skills]) => (
                          <motion.div
                            key={subCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="py-3 lg:py-4"
                          >
                            <h3 className="text-base lg:text-lg font-semibold text-primary/90 mb-2">
                              {subCategory}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3">
                              {skills.map((skill) => (
                                <div key={skill}>
                                  <div className="flex col-span-1 items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 shadow-md hover:shadow-black/30 hover:scale-[101%]">
                                    <span className="text-lg lg:text-xl text-primary">
                                      {iconMap[skill] || <FaDatabase />}
                                    </span>
                                    <span className="font-medium text-text/90 text-sm lg:text-base">
                                      {skill}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </Transition>
                </Tab.Panel>
              ))}
            </AnimatePresence>
          </Tab.Panels>

          <div className="w-full lg:w-2/5 px-2">
            <Image
              src="/images/mf_working.jpg"
              alt="Profile"
              width={500}
              height={500}
              priority
              className="hidden lg:block mx-auto rounded-lg shadow-sm grayscale-[0.65] brightness-75"
            />
          </div>
        </div>
      </Tab.Group>
    </section>
  );
};
