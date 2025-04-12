import React from 'react';
import { motion } from 'framer-motion';

// Fade in animation for content
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in from left animation
export const SlideInLeft = ({ children, delay = 0, duration = 0.6, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Slide in from right animation
export const SlideInRight = ({ children, delay = 0, duration = 0.6, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Scale up animation
export const ScaleUp = ({ children, delay = 0, duration = 0.5, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Spring animation for buttons and interactive elements
export const SpringMotion = ({ children, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered animation container for lists
export const StaggerContainer = ({ children, delayFactor = 0.1, staggerChildren = 0.1, ...props }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delayFactor,
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Staggered item for use with StaggerContainer
export const StaggerItem = ({ children, ...props }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div variants={item} {...props}>
      {children}
    </motion.div>
  );
};

// Animated text word by word (instead of character by character)
export const AnimatedText = ({ text, delay = 0, staggerChildren = 0.03, ...props }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12
      }
    }
  };

  // Split text into words
  const words = text.split(" ");

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      {...props}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: "inline-block" }}>
          <motion.span 
            variants={item} 
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {index !== words.length - 1 && "\u00A0"} {/* Add non-breaking space between words */}
        </span>
      ))}
    </motion.span>
  );
};

// Scroll progress indicator for sections
export const ScrollProgress = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-light-blue-shade-500 dark:bg-dark-blue-shade-300 z-50"
      style={{ scaleX: 0, transformOrigin: "0%" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 }
};

export const scaleVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
}; 