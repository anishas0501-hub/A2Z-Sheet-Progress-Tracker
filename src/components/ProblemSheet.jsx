import React, { useState } from 'react';
import { dsaData } from '../data/dsaData';
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionRow from './QuestionRow';
import { useProgress } from '../context/ProgressContext';
import ProgressBar from './ui/ProgressBar';

export default function ProblemSheet() {
  return (
    <div>
      <div className="card-header">
        <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>Problem Sheet</h1>
        <p className="text-muted">Your complete roadmap to master DSA. Follow sequentially.</p>
      </div>

      <div className="flex-col gap-4">
        {dsaData.map((step) => (
          <StepSection key={step.id} step={step} />
        ))}
      </div>
    </div>
  );
}

function StepSection({ step }) {
  const [isOpen, setIsOpen] = useState(false);
  const { completed } = useProgress();

  // Calculate step progress
  let stepTotal = 0;
  let stepSolved = 0;
  step.topics.forEach(t => {
    t.questions.forEach(q => {
      stepTotal++;
      if (completed[q.id]) stepSolved++;
    });
  });

  return (
    <div className="topic-accordion">
      <div className="topic-header" onClick={() => setIsOpen(!isOpen)}>
        <div>
          <h3 style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
            {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            {step.title}
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span className="text-muted" style={{ fontSize: "14px", minWidth: "40px" }}>
            {stepSolved} / {stepTotal}
          </span>
          <div style={{ width: "100px" }}>
             <ProgressBar value={stepSolved} max={stepTotal} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 20px 20px 20px", borderTop: "1px solid var(--glass-border)" }}>
              {step.topics.map((topic, index) => (
                <div key={topic.id} style={{ marginTop: "24px" }}>
                  <h4 style={{ marginBottom: "16px", color: "var(--accent-primary)", fontSize: "15px" }}>
                    {topic.title}
                  </h4>
                  <div style={{ overflowX: "auto" }}>
                    <table className="table-layout">
                      <thead>
                        <tr>
                          <th style={{ width: "60px", textAlign: "center" }}>Status</th>
                          <th>Problem Title</th>
                          <th style={{ width: "120px" }}>Difficulty</th>
                          <th style={{ width: "80px", textAlign: "center" }}>Mark</th>
                        </tr>
                      </thead>
                      <tbody>
                        <AnimatePresence>
                          {topic.questions.map((q, idx) => (
                            <QuestionRow 
                              key={q.id} 
                              question={q} 
                              delay={idx * 0.05} 
                            />
                          ))}
                        </AnimatePresence>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
