import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuestionRow({ question, delay = 0 }) {
  const { completed, toggleCompleted, markedImportant, toggleImportant } = useProgress();

  const isCompleted = completed[question.id] || false;
  const isImportant = markedImportant[question.id] || false;

  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <td style={{ textAlign: "center" }}>
        <input 
          type="checkbox" 
          className="custom-checkbox"
          checked={isCompleted}
          onChange={() => toggleCompleted(question.id)}
        />
      </td>
      <td>
        <a 
          href={question.leetcodeUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: isCompleted ? "var(--text-secondary)" : "var(--text-primary)", 
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s"
          }}
          className="hover:text-accent-primary"
        >
          {question.title}
          <ExternalLink size={14} style={{ color: "var(--text-secondary)" }} />
        </a>
      </td>
      <td>
        <span className={`difficulty-badge difficulty-${question.difficulty}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: question.difficulty === "Easy" ? "var(--diff-easy-text)" : question.difficulty === "Medium" ? "var(--diff-medium-text)" : "var(--diff-hard-text)",
            display: "inline-block"
          }}></span>
          {question.difficulty}
        </span>
      </td>
      <td style={{ textAlign: "center" }}>
        <Star 
          size={18} 
          className={`important-star ${isImportant ? 'active' : ''}`}
          onClick={() => toggleImportant(question.id)}
        />
      </td>
    </motion.tr>
  );
}
