'use client';

import { ComponentPropsWithRef, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { SelectOption } from '..';
import { useSelect } from '../../provider/select-provider';

export interface SelectListProps
  extends ComponentPropsWithRef<typeof motion.div> {
  options: string[];
  name?: string;
}

export default function SelectList({
  options,
  name,
  ...props
}: SelectListProps) {
  const { isOpen, setIsOpen, setCurrentValue, currentValue } = useSelect();
  const listRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOptionSelect = useCallback(
    (option: string) => {
      setCurrentValue(option);
      setIsOpen(false);
    },
    [setCurrentValue, setIsOpen],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return;

      const currentIndex = options.findIndex(
        (option) => option === currentValue,
      );

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex =
            currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          const nextOption = options[nextIndex];
          setCurrentValue(nextOption);
          optionRefs.current[nextIndex]?.focus();
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          const prevOption = options[prevIndex];
          setCurrentValue(prevOption);
          optionRefs.current[prevIndex]?.focus();
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (currentValue) {
            handleOptionSelect(currentValue);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          break;
        case 'Home':
          e.preventDefault();
          const firstOption = options[0];
          setCurrentValue(firstOption);
          optionRefs.current[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          const lastOption = options[options.length - 1];
          setCurrentValue(lastOption);
          optionRefs.current[options.length - 1]?.focus();
          break;
      }
    },
    [
      currentValue,
      handleOptionSelect,
      isOpen,
      options,
      setCurrentValue,
      setIsOpen,
    ],
  );

  useEffect(() => {
    if (isOpen && listRef.current) {
      listRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={listRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
          role='listbox'
          aria-labelledby={`${name || 'select'}-label`}
          aria-activedescendant={
            currentValue
              ? `${name || 'select'}-option-${currentValue}`
              : undefined
          }
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className={cn(
            'z-index-popover bg-primary border-radius-lg padding-y-4 border-secondary margin-t-4 absolute top-full right-0 left-0 max-h-[300px] w-full flex-col gap-0 overflow-y-auto border focus:outline-none',
          )}
          {...props}
        >
          {options.map((option, index) => (
            <SelectOption
              key={`${option}-${index}`}
              label={option}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              id={`${name || 'select'}-option-${option}`}
              isSelected={option === currentValue}
              onSelect={() => handleOptionSelect(option)}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
