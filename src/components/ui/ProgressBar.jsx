import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ value, max, color = "var(--accent-primary)", height = "6px" }) {
  const percentage = (value / Math.max(max, 1)) * 100;
  
  return (
    <div className="progress-bar-bg" style={{ height, width: "100%" }}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="progress-bar-fill"
        style={{ background: color }}
      />
    </div>
  );
}
