import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="py-5"
          style={{ borderBottom: '1px solid var(--border-default)' }}
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="flex w-full items-center justify-between text-left cursor-pointer focus:outline-none gap-4"
          >
            <span
              className="font-headline font-semibold text-sm md:text-base lg:text-base text-brand-teal"
            >
              {item.question}
            </span>
            {/* Icon circle: rotates Plus 45deg → becomes a × on open, bg transitions */}
            <motion.div
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
              animate={{
                backgroundColor: openId === item.id ? 'var(--brand-teal)' : 'var(--brand-teal-light)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ rotate: openId === item.id ? 45 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Plus
                  size={16}
                  strokeWidth={2.5}
                  color={openId === item.id ? '#FFFFFF' : 'var(--brand-teal)'}
                />
              </motion.div>
            </motion.div>
          </button>
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <p
                  className="mt-3 sm:mt-4 font-body text-sm leading-relaxed pr-10 sm:pr-12 md:pr-14 text-brand-navy/70"
                >
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
