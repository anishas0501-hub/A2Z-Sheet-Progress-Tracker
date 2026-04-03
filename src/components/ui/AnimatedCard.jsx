import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ children, delay = 0, className = "", style, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className={`glass-panel ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}
