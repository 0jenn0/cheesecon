import { ComponentPropsWithRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { SelectOption } from '..';
import { useSelect } from '../../provider/select-provider';

export interface SelectListProps
  extends ComponentPropsWithRef<typeof motion.ul> {
  options: string[];
}

export default function SelectList({ options, ...props }: SelectListProps) {
  const { isOpen } = useSelect();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          className={cn(
            'z-index-popover bg-primary border-radius-lg padding-y-4 border-secondary margin-t-4 absolute top-full right-0 left-0 max-h-[300px] w-full flex-col gap-0 overflow-y-auto border',
          )}
          {...props}
        >
          {options.map((option, index) => (
            <SelectOption key={`${option}-${index}`} label={option} />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}
