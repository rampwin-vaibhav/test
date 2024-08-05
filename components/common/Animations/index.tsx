import { motion } from 'framer-motion';
import React, { ReactNode } from 'react';
interface AnimationProps {
  children: ReactNode;
  duration?: number;
  staggerChildren?: number;
  className?: string;
}

interface SlideInProps extends AnimationProps {
  direction?: 'left' | 'right';
  className?: string;
}

export const SlideIn = ({
  children,
  direction = 'left',
  duration = 0.5,
  ...rest
}: SlideInProps) => {
  const variants = {
    hidden: { x: direction === 'left' ? '100%' : '-100%' },
    visible: { x: 0 },
    exit: { x: direction === 'left' ? '-100%' : '100%' },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      transition={{ duration, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const FadeIn: React.FC<AnimationProps> = ({
  children,
  duration = 0.5,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const ScaleIn: React.FC<AnimationProps> = ({
  children,
  duration = 0.5,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      transition={{ duration, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const RotateIn: React.FC<AnimationProps> = ({
  children,
  duration = 0.5,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ rotate: 180 }}
      animate={{ rotate: 0 }}
      exit={{ rotate: 180 }}
      transition={{ duration, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const FadeUp: React.FC<AnimationProps> = ({
  children,
  duration = 0.5,
  staggerChildren = 0.1,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration, ease: 'easeInOut', staggerChildren }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
