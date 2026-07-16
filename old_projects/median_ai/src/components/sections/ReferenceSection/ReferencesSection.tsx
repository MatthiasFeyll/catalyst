import { References } from '@/config/references';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox, Transition } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, useState } from 'react';
import { ReferenceDetails } from './Details';

export const ReferenceSection = () => {
  const [selectedReference, setSelectedReference] = useState(References[0]);

  // Animation variants
  const listItemVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    selected: { borderColor: 'var(--primary)', backgroundColor: 'rgba(var(--primary-rgb), 0.1)' },
  };

  // Mobile Listbox component
  const MobileReferenceSelector = () => (
    <Listbox value={selectedReference} onChange={setSelectedReference}>
      <div className="relative py-4 mt-1 lg:hidden">
        <Listbox.Button className="relative w-full py-3 pl-4 pr-10 text-left rounded-lg bg-black/20 border border-primary/20">
          <span className="block truncate text-primary">{selectedReference.title}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FontAwesomeIcon icon={faChevronDown} className="w-5 h-5 text-primary/50" />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-black/95 backdrop-blur-sm max-h-60 ring-1 ring-primary/20 z-50">
            {References.map((ref) => (
              <Listbox.Option
                key={ref.id}
                value={ref}
                className={({ active }) =>
                  `cursor-pointer select-none relative py-3 pl-4 pr-4 ${
                    active ? 'bg-primary/10 text-primary' : 'text-text'
                  }`
                }
              >
                {({ selected }) => (
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon
                      icon={ref.icon}
                      className={`w-5 h-5 ${selected ? 'text-primary' : 'text-text/50'}`}
                    />
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {ref.title}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );

  return (
    <section className="min-h-screen h-screen text-text lg:ms-[10vw] lg:w-4/5 pt-[10vh] lg:pt-[15vh] px-4">
      <h2 className="text-2xl font-semibold text-text border-b pb-2 lg:mb-8">References</h2>

      {/* Mobile Dropdown */}
      <MobileReferenceSelector />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Desktop List */}
        <div className="hidden lg:block space-y-3 lg:col-span-1">
          {References.map((reference) => (
            <motion.div
              key={reference.id}
              onClick={() => setSelectedReference(reference)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3
                                ${
                                  selectedReference.id === reference.id
                                    ? 'border-primary bg-primary/10'
                                    : 'border-primary/30 hover:border-primary/50'
                                }`}
              variants={listItemVariants}
              whileHover="hover"
              whileTap="tap"
              layoutId={`listItem-${reference.id}`}
            >
              <div className="text-primary text-xl">
                <FontAwesomeIcon icon={reference.icon} className="w-5 h-5" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold">{reference.title}</h3>
                <p className="text-text/70 text-xs mt-1 font-medium">{reference.subtitle}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedReference.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.2 }}
            >
              <ReferenceDetails reference={selectedReference} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
