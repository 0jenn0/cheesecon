'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib';
import { Icon } from '@/shared/ui/display';

export const COLOR_MAP = {
  blue: '#C6EAFF',
  pink: '#FFADC6',
  black: '#000000',
  white: '#FFFFFF',
} as const;

export type ColorMap = keyof typeof COLOR_MAP;

interface ColorPickerProps {
  color: keyof typeof COLOR_MAP;
  handleChangeColor: (color: keyof typeof COLOR_MAP) => void;
  className?: string;
}

export default function ColorPicker({
  color,
  handleChangeColor,
  className,
}: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <motion.div
      layout
      className={cn(
        'z-index-popover padding-8 border-radius-lg absolute top-0 right-0 flex items-center justify-center gap-8 bg-gray-100/60 backdrop-blur-sm',
        className,
      )}
      animate={{
        width: isOpen ? 'auto' : 'auto',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      }}
    >
      <motion.div
        className='flex cursor-pointer items-center gap-4'
        onClick={!isOpen ? handleToggle : undefined}
      >
        <ColorChip color={color} onClick={handleToggle} />
        <motion.div
          className='height-16 border-r border-gray-300'
          animate={{
            opacity: isOpen ? 0 : 1,
            width: isOpen ? 0 : 'auto',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
        />
      </motion.div>

      <motion.div
        className='flex items-center gap-8'
        initial={{ opacity: 0, width: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          width: isOpen ? 'auto' : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
          duration: 0.3,
        }}
        style={{ overflow: 'hidden' }}
      >
        {Object.entries(COLOR_MAP).map(([color]) => (
          <div key={color} className='flex items-center gap-4'>
            <ColorChip
              color={color as keyof typeof COLOR_MAP}
              onClick={handleChangeColor}
            />
            <div className='height-24 border-r border-gray-300' />
          </div>
        ))}
        <motion.button
          type='button'
          onClick={handleToggle}
          className='cursor-pointer'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            animate={{
              rotate: isOpen ? 90 : 270,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              duration: 0.3,
            }}
          >
            <Icon name='chevron-down' size={20} className='icon-secondary' />
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function ColorChip({
  color,
  onClick,
}: {
  color: keyof typeof COLOR_MAP;
  onClick?: (colorName: keyof typeof COLOR_MAP) => void;
}) {
  return (
    <button
      type='button'
      className='height-24 border-radius-md border-outline w-24 cursor-pointer border-2 border-white'
      style={{ backgroundColor: COLOR_MAP[color] }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(color);
      }}
    />
  );
}
